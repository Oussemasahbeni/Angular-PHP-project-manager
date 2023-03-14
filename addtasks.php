<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");


$method = $_SERVER['REQUEST_METHOD'];

if ($method == "OPTIONS") {
    die();
}


if ($_SERVER['REQUEST_METHOD'] !== 'POST') :
    http_response_code(405);
    echo json_encode([
        'success' => 0,
        'message' => 'Bad Request!.Only POST method is allowed',
    ]);
    exit;
endif;

require 'connect.php';
$database = new config();
$conn = $database->getConnection();

$data = json_decode(file_get_contents("php://input"));



if (!isset($data->taskID) || !isset($data->description) || !isset($data->status)) :

    echo json_encode([
        'success' => 0,
        'message' => 'Please enter compulsory fileds |  id, description and status',
    ]);
    exit;

elseif (empty(trim($data->taskID)) || empty(trim($data->description)) || empty(trim($data->status))) :

    echo json_encode([
        'success' => 0,
        'message' => 'Field cannot be empty. Please fill all the fields.',
    ]);
    exit;

endif;

try {
    $Project_id = htmlspecialchars(trim($data->Project_id));
    $taskID = htmlspecialchars(trim($data->taskID));
    $description = htmlspecialchars(trim($data->description));
    $status = htmlspecialchars(trim($data->status));
    $due_date = htmlspecialchars(trim($data->due_date));

    $memberID = htmlspecialchars(trim($data->memberID));



    $query = "INSERT INTO `tasks`(
    Project_id,
    memberID,
    taskID,
    description,
    due_date,
    status
    
    ) 
    VALUES(
    :Project_id,
    :memberID,
    :taskID,
    :description,
    :due_date,
    :status
    
    )";

    $stmt = $conn->prepare($query);

    $stmt->bindValue(':taskID', $taskID, PDO::PARAM_INT);
    $stmt->bindValue(':description', $description, PDO::PARAM_STR);
    $stmt->bindValue(':due_date', $due_date, PDO::PARAM_STR);
    $stmt->bindValue(':status', $status, PDO::PARAM_STR);
    $stmt->bindValue(':Project_id', $Project_id, PDO::PARAM_STR);
    $stmt->bindValue(':memberID', $memberID, PDO::PARAM_STR);





    if ($stmt->execute()) {

        http_response_code(201);
        echo json_encode([
            'success' => 1,
            'message' => 'Data Inserted Successfully.'
        ]);
        exit;
    }

    echo json_encode([
        'success' => 0,
        'message' => 'There is some problem in data inserting'
    ]);
    exit;
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        'success' => 0,
        'message' => $e->getMessage()
    ]);
    exit;
}
