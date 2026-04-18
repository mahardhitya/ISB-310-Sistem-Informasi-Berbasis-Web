<?php
require 'config/koneksi.php';
$msg = "";
$msg_type = "";

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = trim($_POST['name']);
    $email = trim($_POST['email']);

    if (empty($name) || empty($email)) {
        $msg = "Fields cannot be empty.";
        $msg_type = "error";
    } 
    elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $msg = "Invalid email address.";
        $msg_type = "error";
    } 
    else {
        $cek_query = "SELECT * FROM users WHERE email = '$email' OR name = '$name'";
        $cek_result = $conn->query($cek_query);

        if ($cek_result->num_rows > 0) {
            $msg = "This email or name is already registered. Please try another.";
            $msg_type = "error";
        } else {
            $insert_query = "INSERT INTO users (name, email) VALUES ('$name', '$email')";
            if ($conn->query($insert_query) === TRUE) {
                $msg = "User has been successfully inserted.";
                $msg_type = "success";
            } else {
                $msg = "Error inserting data.";
                $msg_type = "error";
            }
        }
    }
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Create Data</title>
    <link rel="stylesheet" href="assets/css/style.css">
</head>
<body>

<div class="container">
    <h2>Create Data</h2>

    <form method="POST" action="">
        <div class="form-group">
            <label>Name:</label>
            <input type="text" name="name" placeholder="Your Name" value="<?php echo isset($name) ? $name : ''; ?>">
        </div>
        <div class="form-group">
            <label>Email:</label>
            <input type="text" name="email" placeholder="Your email" value="<?php echo isset($email) ? $email : ''; ?>">
        </div>

        <?php if($msg != ""): ?>
            <div class="<?php echo $msg_type == 'error' ? 'alert-error' : 'alert-success'; ?>">
                <?php echo $msg; ?>
            </div>
        <?php endif; ?>

        <button type="submit" class="btn-submit">Insert</button>
    </form>

    <div class="nav-buttons">
        <a href="index.php">CREATE</a>
        <a href="read.php">READ</a>
    </div>
</div>

</body>
</html>