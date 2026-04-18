<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <title>Tugas Kelas</title>
    <style>
        table {
            border-collapse: collapse;
            margin: 20px;
        }
        td {
            border: 2px solid #333;
            padding: 20px;
            text-align: center;
            width: 50px;
            cursor: pointer;
            transition: 0.2s;
            font-family: Arial, sans-serif;
        }

        .warna-1:hover { background-color: red; color: white; }
        .warna-2:hover { background-color: yellow; color: black; }
        .warna-3:hover { background-color: green; color: white; }
        .warna-4:hover { background-color: blue; color: white; }
        .warna-5:hover { background-color: brown; color: white; }
    </style>
</head>
<body>


    <table>
        <?php
        for ($baris = 1; $baris <= 5; $baris++) {
            echo "<tr>";
            
            for ($kolom = 1; $kolom <= 5; $kolom++) {
                echo "<td class='warna-$baris'>$baris,$kolom</td>";
            }
            
            echo "</tr>";
        }
        ?>
    </table>

</body>
</html>