<?php
if($_SERVER['REQUEST_METHOD'] == 'POST'){
    $email = $_POST['Remail'];
    $name = $_POST['name'];
    $age = $_POST['age'];
    $major = $_POST['major'];

    echo "Hola $name";
}else{
     echo "Error";
}

?>