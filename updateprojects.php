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



if (!isset($data->id)) {
    echo json_encode(['success' => 0, 'message' => 'Please enter correct project id.']);
    exit;
}

try {

    $fetch_post = "SELECT * FROM `projects` WHERE id=:id";
    $fetch_stmt = $conn->prepare($fetch_post);
    $fetch_stmt->bindValue(':id', $data->id, PDO::PARAM_INT);
    $fetch_stmt->execute();

    if ($fetch_stmt->rowCount() > 0) :
        //echo 'AAA';
        $row = $fetch_stmt->fetch(PDO::FETCH_ASSOC);
        $id = isset($data->id) ? $data->id : $row['id'];
        $description = isset($data->description) ? $data->description : $row['description'];
        $start_date = isset($data->start_date) ? $data->start_date : $row['start_date'];

        $end_date = isset($data->end_date) ? $data->end_date : $row['end_date'];

        $name = isset($data->name) ? $data->name : $row['name'];
        $update_query = "UPDATE `projects` SET id = :id, description = :description, start_date = :start_date, end_date = :end_date,
       name = :name
        WHERE id = :id";

        $update_stmt = $conn->prepare($update_query);

        $update_stmt->bindValue(':id', htmlspecialchars(strip_tags($id)), PDO::PARAM_INT);
        $update_stmt->bindValue(':description', htmlspecialchars(strip_tags($description)), PDO::PARAM_STR);
        $update_stmt->bindValue(':start_date', htmlspecialchars(strip_tags($start_date)), PDO::PARAM_STR);

        $update_stmt->bindValue(':end_date', htmlspecialchars(strip_tags($end_date)), PDO::PARAM_STR);

        $update_stmt->bindValue(':name', htmlspecialchars(strip_tags($name)), PDO::PARAM_STR);
        $update_stmt->bindValue(':id', $data->id, PDO::PARAM_INT);


        if ($update_stmt->execute()) {

            echo json_encode([
                'success' => 1,
                'message' => 'Record udated successfully'
            ]);
            exit;
        }

        echo json_encode([
            'success' => 0,
            'message' => 'Did not udpate. Something went  wrong.'
        ]);
        exit;

    else :
        echo json_encode(['success' => 0, 'message' => 'Invalid ID. No record found by the ID.']);
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
