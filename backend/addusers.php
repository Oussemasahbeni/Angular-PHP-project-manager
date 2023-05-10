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



if (!isset($data->firstname) || !isset($data->lastname) || !isset($data->email) || !isset($data->age) || !isset($data->username) || !isset($data->password) || !isset($data->gender)) :

    echo json_encode([
        'success' => 0,
        'message' => 'Please enter compulsory fileds |  firstname, lastname and email',
    ]);
    exit;

elseif (empty(trim($data->firstname)) || empty(trim($data->lastname)) || empty(trim($data->email))) :

    echo json_encode([
        'success' => 0,
        'message' => 'Field cannot be empty. Please fill all the fields.',
    ]);
    exit;

endif;

try {

    $firstname = htmlspecialchars(trim($data->firstname));
    $lastname = htmlspecialchars(trim($data->lastname));
    $age = htmlspecialchars(trim($data->age));
    $username = htmlspecialchars(trim($data->username));
    $email = htmlspecialchars(trim($data->email));
    $gender = htmlspecialchars(trim($data->gender));
    $password1 = htmlspecialchars(trim($data->password));
    $password = password_hash($password1, PASSWORD_DEFAULT);


    $query = "INSERT INTO `user`(
    firstname,
    lastname,
    age,
    username,
    email,
    gender,
    password
    ) 
    VALUES(
    :firstname,
    :lastname,
    :age,
    :username,
    :email,
    :gender,
    :password
    )";

    $stmt = $conn->prepare($query);

    $stmt->bindValue(':firstname', $firstname, PDO::PARAM_STR);
    $stmt->bindValue(':lastname', $lastname, PDO::PARAM_STR);
    $stmt->bindValue(':age', $age, PDO::PARAM_STR);
    $stmt->bindValue(':username', $username, PDO::PARAM_STR);
    $stmt->bindValue(':email', $email, PDO::PARAM_STR);
    $stmt->bindValue(':gender', $gender, PDO::PARAM_STR);
    $stmt->bindValue(':password', $password, PDO::PARAM_STR);



    if ($stmt->execute()) {
        $user_id = $conn->lastInsertId();
        http_response_code(201);
        echo json_encode([
            'success' => 1,
            'message' => 'Data Inserted Successfully.',
            'user_id' => $user_id,
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
