<?php
$url = $_REQUEST["url"];
$amount = $_REQUEST["amount"];
if (!isset($url) || empty($url)) {
    echo "missing target url";
    exit();
}

$item = $url;
//$item = base64_encode($url);
?>
<html>
<body>
<form id="form" action="https://www.paypal.com/cgi-bin/webscr" method="post">
    <input type="hidden" name="cmd" value="_xclick">
    <input type="hidden" name="item_name" value="<?php echo $item; ?>">
    <?php
    if (isset($amount) && !empty($amount) || is_numeric($amount)) {
        ?>
        <input type="hidden" name="amount" value="<?php echo $amount; ?>">
        <?php
    }
    ?>
    <input type="hidden" name="business" value="donation@inventivetalent.org">
    <input type="hidden" name="currency_code" value="EUR">
    <input type="hidden" name="return" value="https://download.inventivetalent.org/external/paypal/success.php?item=<?php echo $item; ?>">
    <input type="hidden" name="return_cancel" value="https://download.inventivetalent.org/external/paypal/cancel.php?item=<?php echo $item; ?>">
    <!-- <input type="hidden" name="lc" value="US"> -->
    <!-- <input type="hidden" name="cancel_return" value="https://donation.inventivetalent.org/paypal/cancel"> -->
    <!-- <input type="hidden" name="amount" value="1.00"> -->
</form>

<script>
    (function () {
        document.getElementById("form").submit();
    })();
</script>
</body>
</html>