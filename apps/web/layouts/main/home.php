<?php $reuse = $_SERVER['DOCUMENT_ROOT']."/layouts/reuse/"; ?>
<?php include($reuse."notice.html"); ?>

<!DOCTYPE html>

<html lang="en" theme="light">

<?php include($reuse."head.html"); ?>

<body data-barba="wrapper">
    <?php include($reuse."load.php"); ?>

    <main data-barba="container" data-barba-namespace="home">
        <!-- Content of the home page -->
        <section></section>
    </main>

    <?php include($reuse."footer.html"); ?>
</body>

</html>