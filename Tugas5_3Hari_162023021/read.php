<?php require 'config/koneksi.php'; ?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Read Data</title>
    <link rel="stylesheet" href="assets/css/style.css">
</head>
<body>

<div class="container">
    <h2>Read Data</h2>

    <div class="data-list">
        <?php
        $sql = "SELECT * FROM users ORDER BY id DESC";
        $result = $conn->query($sql);

        if ($result->num_rows > 0) {
            while($row = $result->fetch_assoc()) {
                echo '<div class="list-item">';
                echo '<div class="list-info">';
                echo '<p><strong>' . htmlspecialchars($row['name']) . '</strong></p>';
                echo '<p class="email-text">' . htmlspecialchars($row['email']) . '</p>';
                echo '</div>';
                echo '<div class="action-btns">';
                echo '<a href="update.php?id=' . $row['id'] . '" class="btn-edit">Edit</a> ';
                // Konfirmasi JS saat delete 
                echo '<a href="delete.php?id=' . $row['id'] . '" class="btn-delete" onclick="return confirm(\'Are you sure?\')">Delete</a>';
                echo '</div>';
                echo '</div>';
            }
        } else {
            echo "<p style='text-align:center;'>No data found.</p>";
        }
        ?>
    </div>

    <div class="nav-buttons">
        <a href="index.php">CREATE</a>
        <a href="read.php">READ</a>
    </div>
</div>

</body>
</html>
