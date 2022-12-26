<?php

$name = $_POST["name"];
$phone = filter_input(INPUT_POST, "phone", FILTER_VALIDATE_INT);
$email = filter_input(INPUT_POST, "email", FILTER_VALIDATE_EMAIL);
 