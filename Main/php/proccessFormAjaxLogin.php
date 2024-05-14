<?php
if($_SERVER['REQUEST_METHOD'] == 'POST'){
    $email = $_POST['Remail'];

    echo "Hola $email";
}else{
     echo "Error";
}

?>