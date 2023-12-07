<?php
$recaptcha_secret = '6LfO8ikpAAAAAEqwMa9SKPdJfj6joP5pjacL9Do2';
$recaptcha_response = $_POST['g-recaptcha-response'];

$recaptcha_url = 'https://www.google.com/recaptcha/api/siteverify';
$recaptcha_data = [
    'secret' => $recaptcha_secret,
    'response' => $recaptcha_response,
];

$recaptcha_options = [
    'http' => [
        'method' => 'POST',
        'content' => http_build_query($recaptcha_data),
    ],
];

$recaptcha_context = stream_context_create($recaptcha_options);
$recaptcha_result = file_get_contents($recaptcha_url, false, $recaptcha_context);
$recaptcha_result = json_decode($recaptcha_result);

if ($recaptcha_result->success) {
    // reCAPTCHA verification passed, process the form submission
    $score = $recaptcha_result->score;
    
    // You can adjust the threshold as needed. For example, consider a score of 0.7 as a good threshold.
    if ($score >= 0.7) {
        // The action is likely performed by a human, proceed with your form processing logic
        echo "Form processed successfully.";
    } else {
        // The action may be suspicious, handle accordingly (e.g., show an additional verification step)
        echo "Suspicious activity detected. Additional verification required.";
    }
} else {
    // reCAPTCHA verification failed, handle accordingly (e.g., show an error message to the user)
    echo "reCAPTCHA verification failed. Please try again.";
}
?>