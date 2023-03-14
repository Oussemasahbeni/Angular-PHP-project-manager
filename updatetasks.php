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


if ($_SERVER['REQUEST_METHOD'] !== 'PUT') :
    http_response_code(405);
    echo json_encode([
        'success' => 0,
        'message' => 'Bad Request detected! Only PUT method is allowed',
    ]);
    exit;
endif;

require 'connect.php';
$database = new config();
$conn = $database->getConnection();

$data = json_decode(file_get_contents("php://input"));

//print_r($data);

//die();



if (!isset($data->taskID)) {
    echo json_encode(['success' => 0, 'message' => 'Please enter correct Students taskID.']);
    exit;
}

try {

    $fetch_post = "SELECT * FROM `tasks` WHERE taskID=:taskID";
    $fetch_stmt = $conn->prepare($fetch_post);
    $fetch_stmt->bindValue(':taskID', $data->taskID, PDO::PARAM_INT);
    $fetch_stmt->execute();

    if ($fetch_stmt->rowCount() > 0) :
        //echo 'AAA';
        $row = $fetch_stmt->fetch(PDO::FETCH_ASSOC);
        // $taskID = isset($data->taskID) ? $data->taskID : $row['taskID'];
        $description = isset($data->description) ? $data->description : $row['description'];
        $due_date = isset($data->due_date) ? $data->due_date : $row['due_date'];
        $status = isset($data->status) ? $data->status : $row['status'];
        // $Project_id = isset($data->Project_id) ? $data->Project_id : $row['Project_id'];
        // $memberID = isset($data->memberID) ? $data->memberID : $row['memberID'];


        $update_query = "UPDATE `tasks` SET /*taskID = :taskID,*/ description = :description, due_date = :due_date, status = :status /*, Project_id=:Project_id,memberID=:memberID*/
      
        WHERE taskID = :taskID";

        $update_stmt = $conn->prepare($update_query);

        //$update_stmt->bindValue(':taskID', htmlspecialchars(strip_tags($taskID)), PDO::PARAM_INT);
        $update_stmt->bindValue(':description', htmlspecialchars(strip_tags($description)), PDO::PARAM_STR);
        $update_stmt->bindValue(':due_date', htmlspecialchars(strip_tags($due_date)), PDO::PARAM_STR);
        //$update_stmt->bindValue(':Project_id', htmlspecialchars(strip_tags($Project_id)), PDO::PARAM_INT);
        //$update_stmt->bindValue(':memberiD', htmlspecialchars(strip_tags($memberID)), PDO::PARAM_INT);
        $update_stmt->bindValue(':status', htmlspecialchars(strip_tags($status)), PDO::PARAM_STR);


        $update_stmt->bindValue(':taskID', $data->taskID, PDO::PARAM_INT);


        if ($update_stmt->execute()) {

            echo json_encode([
                'success' => 1,
                'message' => 'Record udated successfully'
            ]);
            exit;
        }

        echo json_encode([
            'success' => 0,
            'message' => 'DtaskID not udpate. Something went  wrong.'
        ]);
        exit;

    else :
        echo json_encode(['success' => 0, 'message' => 'InvaltaskID taskID. No record found by the taskID.']);
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
