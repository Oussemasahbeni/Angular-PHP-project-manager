<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: *");
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



if (!isset($data->id) || !isset($data->description) || !isset($data->name) || !isset($data->start_date) || !isset($data->end_date)) :

    echo json_encode([
        'success' => 0,
        'message' => 'Please enter compulsory fileds |  id, description and name',
    ]);
    exit;

elseif (empty(trim($data->id)) || empty(trim($data->description)) || empty(trim($data->name))) :

    echo json_encode([
        'success' => 0,
        'message' => 'Field cannot be empty. Please fill all the fields.',
    ]);
    exit;

endif;

try {

    $id = htmlspecialchars(trim($data->id));
    $description = htmlspecialchars(trim($data->description));
    $start_date = htmlspecialchars(trim($data->start_date));
    $end_date = htmlspecialchars(trim($data->end_date));
    $name = htmlspecialchars(trim($data->name));


    $query = "INSERT INTO `projects`(
    id,
    description,
    start_date,
    end_date,
    name
    ) 
    VALUES(
    :id,
    :description,
    :start_date,
    :end_date,
    :name
    )";

    $stmt = $conn->prepare($query);

    $stmt->bindValue(':id', $id, PDO::PARAM_INT);
    $stmt->bindValue(':description', $description, PDO::PARAM_STR);
    $stmt->bindValue(':start_date', $start_date, PDO::PARAM_STR);
    $stmt->bindValue(':end_date', $end_date, PDO::PARAM_STR);
    $stmt->bindValue(':name', $name, PDO::PARAM_STR);



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
