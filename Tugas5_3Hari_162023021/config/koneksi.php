<?php
$host = "localhost";
$user = "root"; 
$pass = "";     
$db   = "Tugas5_3hari_162023021";

$conn = new mysqli($host, $user, $pass, $db);

if ($conn->connect_error) {
    die("Koneksi gagal: " . $conn->connect_error);
}
?>