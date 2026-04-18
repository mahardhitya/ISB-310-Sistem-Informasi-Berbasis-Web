<?php
require 'config/koneksi.php';
$msg = "";
$msg_type = "";

if (isset($_GET['id'])) {
    $id = $_GET['id'];
    $result = $conn->query("SELECT * FROM users WHERE id = $id");
    $user = $result->fetch_assoc();
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $id = $_POST['id'];
    $name = trim($_POST['name']);
    $email = trim($_POST['email']);

    if (empty($name) || empty($email)) {
        $msg = "Fields cannot be empty.";
        $msg_type = "error";
    } elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $msg = "Invalid email address.";
        $msg_type = "error";
    } else {
        $update_query = "UPDATE users SET name='$name', email='$email' WHERE id=$id";
        if ($conn->query($update_query) === TRUE) {
            header("Location: read.php"); // Kembali ke read data setelah sukses
            exit;
        } else {
            $msg = "Error updating data.";
            $msg_type = "error";
        }
    }
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Update User</title>
    <link rel="stylesheet" href="assets/css/style.css">
</head>
<body>

<div class="container">
    <h2>Update User</h2>

    <form method="POST" action="">
        <input type="hidden" name="id" value="<?php echo $user['id']; ?>">
        <div class="form-group">
            <label>Name:</label>
            <input type="text" name="name" value="<?php echo $user['name']; ?>">
        </div>
        <div class="form-group">
            <label>Email:</label>
            <input type="text" name="email" value="<?php echo $user['email']; ?>">
        </div>

        <?php if($msg != ""): ?>
            <div class="<?php echo $msg_type == 'error' ? 'alert-error' : 'alert-success'; ?>">
                <?php echo $msg; ?>
            </div>
        <?php endif; ?>

        <button type="submit" class="btn-submit">Update</button>
    </form>

    <div class="nav-buttons">
        <a href="index.php">CREATE</a>
        <a href="read.php">READ</a>
    </div>
</div>

</body>
</html>