<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json; charset=UTF-8");
error_reporting(E_ERROR);
if ($_SERVER['REQUEST_METHOD'] !== 'GET') :
    http_response_code(405);
    echo json_encode([
        'success' => 0,
        'message' => 'Bad Reqeust Detected! Only get method is allowed',
    ]);
    exit;
endif;

require 'connect.php';
$database = new config();
$conn = $database->getConnection();
$memberID = null;
$aa = null;

if (isset($_GET['Project_id'])) {
    $memberID = filter_var($_GET['Project_id'], FILTER_VALIDATE_INT, [
        'options' => [
            'default' => 'all_members',
            'min_range' => 1
        ]
    ]);
}
if (isset($_GET['memberID'])) {
    $aa = filter_var($_GET['memberID'], FILTER_VALIDATE_INT, [
        'options' => [
            'default' => 'all_members',
            'min_range' => 1
        ]
    ]);
}


try {

    $sql = is_numeric($memberID) ? "SELECT * FROM `project_members` WHERE Project_id ='$memberID' and memberID='$aa' " : "SELECT * FROM `project_members`";


    $stmt = $conn->prepare($sql);

    $stmt->execute();

    if ($stmt->rowCount() > 0) :

        $data = null;
        if (is_numeric($memberID)) {
            $data = $stmt->fetchALL(PDO::FETCH_ASSOC);
        } else {
            $data = $stmt->fetchAll(PDO::FETCH_ASSOC);
        }

        echo json_encode([
            'success' => 1,
            'data' => $data,
        ]);

    else :
        echo json_encode([
            'success' => 0,
            'message' => 'No Record Found!',
        ]);
    endif;
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        'success' => 0,
        'message' => $e->getMessage()
    ]);
    exit;
}
