<?php

$recepient = "h3mm3n1@mail.ru";
$sitename = "Калькулятор от Никиты";

$name = trim($_POST["name"]);
$phone = trim($_POST["Email-адрес"]);
$text = trim($_POST["text"]);
$message = "Имя: $name \Почта: $Email-адрес \nТекст: $text";

$pagetitle = "Новая заявка с сайта \"$sitename\"";
mail($recepient, $pagetitle, $message, "Content-type: text/plain; charset=\"utf-8\"\n From: $recepient");