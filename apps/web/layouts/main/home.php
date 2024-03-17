<?php
include($_SERVER['DOCUMENT_ROOT'] . "/layouts/reuse/notice.php");
?>

<!DOCTYPE html>

<html lang="en" theme="light">

<?php
include($_SERVER['DOCUMENT_ROOT'] . "/layouts/reuse/head.html");
?>

<body data-barba="wrapper">
  <script src="https://code.jquery.com/jquery-3.7.1.min.js" integrity="sha256-/JqT3SQfawRcv/BIHPThkBvs0OEvtFFmqPF/lYI/Cxo=" crossorigin="anonymous"></script>

  <script src="https://cdn.jsdelivr.net/npm/@barba/core@2.9.7/dist/barba.umd.min.js" integrity="sha256-JhRJFoR0Bcz8x0FUX+R7/qd8OEn+CL4BWcZzxzfkEgs=" crossorigin="anonymous"></script>

  <?php
  include($_SERVER['DOCUMENT_ROOT'] . "/layouts/reuse/loading.php");
  include($_SERVER['DOCUMENT_ROOT'] . "/layouts/reuse/navigation.php");
  ?>

  <main data-barba="container" data-barba-namespace="home">
    <section></section>
  </main>

  <?php
  include($_SERVER['DOCUMENT_ROOT'] . "/layouts/reuse/footer.php");
  ?>
</body>

</html>