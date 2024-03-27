<div>
    <?php $svgs = $_SERVER['DOCUMENT_ROOT']."/assets/svgs/"; ?>
    <link rel="stylesheet" href="/styles/reuse/load.css" />

    <div id="loader">
        <div class="screen">
            <div class="logo-mask">
                <div class="logo">
                    <?php include($svgs."loader-logo.svg"); ?>
                </div>
            </div>
        </div>
    </div>

    <script type="module" src="/javascript/reuse/load.js"></script>
</div>