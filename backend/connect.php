<?php
ob_start();
// Set sessions
if (!isset($_SESSION)) {
    session_start();
}
class config
{
    private $db_host = 'localhost';
    private $db_name = 'project_manager';
    private $db_username = 'root';
    private $db_password = '';

    public function getConnection()
    {
        try {
            $conn = new PDO('mysql:host=' . $this->db_host . ';dbname=' . $this->db_name, $this->db_username, $this->db_password);
            $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            return $conn;
        } catch (PDOException $e) {
            echo "Connection error " . $e->getMessage();
            exit;
        }
    }
}
