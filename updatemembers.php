<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: PUT");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");


$method = $_SERVER['REQUEST_METHOD'];

if ($method == "OPTIONS") {
    die();
}




require 'connect.php';
$database = new config();
$conn = $database->getConnection();

$data = json_decode(file_get_contents("php://input"));

//print_r($data);

//die();



/*if (!isset($data->memberID)) {
    echo json_encode(['success' => 0, 'message' => 'Please enter correct Students memberID.']);
    exit;
}*/

try {

    $fetch_post = "SELECT * FROM `project_members` WHERE memberID=:memberID";
    $fetch_stmt = $conn->prepare($fetch_post);
    $fetch_stmt->bindValue(':memberID', $data->memberID, PDO::PARAM_INT);
    $fetch_stmt->execute();

    if ($fetch_stmt->rowCount() > 0) :
        $row = $fetch_stmt->fetch(PDO::FETCH_ASSOC);
        $memberID = isset($data->memberID) ? $data->memberID : $row['memberID'];
        //$Project_id = isset($data->Project_id) ? $data->Project_id : $row['Project_id'];
        $Member_email = isset($data->Member_email) ? $data->Member_email : $row['Member_email'];
        $Role = isset($data->Role) ? $data->Role : $row['Role'];
        $name = isset($data->name) ? $data->name : $row['name'];
        $update_query = "UPDATE `project_members` SET memberID = :memberID,  Member_email = :Member_email, Role = :Role,
       name = :name
        WHERE memberID = :memberID";

        $update_stmt = $conn->prepare($update_query);
        $update_stmt->bindValue(':memberID', htmlspecialchars(strip_tags($memberID)), PDO::PARAM_INT);
        //$update_stmt->bindValue(':Project_id', htmlspecialchars(strip_tags($Project_id)), PDO::PARAM_STR);
        $update_stmt->bindValue(':Member_email', htmlspecialchars(strip_tags($Member_email)), PDO::PARAM_STR);
        $update_stmt->bindValue(':Role', htmlspecialchars(strip_tags($Role)), PDO::PARAM_STR);
        $update_stmt->bindValue(':name', htmlspecialchars(strip_tags($name)), PDO::PARAM_STR);
        $update_stmt->bindValue(':memberID', $data->memberID, PDO::PARAM_INT);


        if ($update_stmt->execute()) {

            echo json_encode([
                'success' => 1,
                'message' => 'Record updated successfully'
            ]);
            exit;
        }

        echo json_encode([
            'success' => 0,
            'message' => 'memberID not udpate. Something went  wrong.'
        ]);
        exit;

    else :
        echo json_encode(['success' => 0, 'message' => 'Invalid memberID. No record found by the memberID.']);
        exit;
    endif;
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        'success' => 0,
        'message' => $e->getMessage()
    ]);
    exit;
}
