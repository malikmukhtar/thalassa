<?php
require 'phpmailer/PHPMailerAutoload.php';

    $mail = new PHPMailer;
    $mail->IsSMTP();
    $mail->Host = "mail.globalconsultingpk.com";
    $mail->SMTPAuth = true;
    $mail->SMTPSecure = 'ssl';
    $mail->Port = 465;
    $mail->Username = 'support@logistica.globalconsultingpk.com';
    $mail->Password = 'DY.OUUC8_sS~';
    
    $name=$_POST['name'];
    $email=$_POST['email'];
    $message=$_POST['message'];
    $subject=$_POST['subject'];

   
    $mail->setFrom($email, $name);
    $mail->addReplyTo($email, $name);
    $mail->Subject = $subject;
    $mail->addAddress('support@logistica.globalconsultingpk.com', 'Logistic');
    
    $message = $message;
    
    $mail->msgHTML($message);
    
    if ($mail->send()) {
        echo 'Mail Has Been Sent, We\'ll Contact You Soon';
    } else {
        echo 'reason:<br>'.$mail->ErrorInfo.'<br>';
    }
?>