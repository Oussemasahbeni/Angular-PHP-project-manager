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



if (!isset($data->memberID) || !isset($data->Role) || !isset($data->name)) :

    echo json_encode([
        'success' => 0,
        'message' => 'Please enter compulsory fileds |  memberID, role and name',
    ]);
    exit;

elseif (empty(trim($data->memberID)) || empty(trim($data->Role)) || empty(trim($data->name))) :

    echo json_encode([
        'success' => 0,
        'message' => 'Field cannot be empty. Please fill all the fields.',
    ]);
    exit;

endif;

try {

    $memberID = htmlspecialchars(trim($data->memberID));
    $Role = htmlspecialchars(trim($data->Role));
    $Project_id = htmlspecialchars(trim($data->Project_id));
    $Member_email = htmlspecialchars(trim($data->Member_email));
    $name = htmlspecialchars(trim($data->name));


    $query = "INSERT INTO `project_members`(
    memberID,
    Role,
    Project_id,
    Member_email,
    name
    ) 
    VALUES(
    :memberID,
    :Role,
    :Project_id,
    :Member_email,
    :name
    )";

    $stmt = $conn->prepare($query);

    $stmt->bindValue(':memberID', $memberID, PDO::PARAM_INT);
    $stmt->bindValue(':Role', $Role, PDO::PARAM_STR);
    $stmt->bindValue(':Project_id', $Project_id, PDO::PARAM_STR);
    $stmt->bindValue(':Member_email', $Member_email, PDO::PARAM_STR);
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
