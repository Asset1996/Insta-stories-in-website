<style>
.slider_insta {
  width: 264px;
  height: 420px;
  margin-top: 30px;
}
.slider_item video {
    height: 100%;
    width: 100%;
}
body {
    width: 240px;
    margin: 0 0;
}
</style>
<link rel="stylesheet" href="slider.css">

<body>
<?php 
    $dir = "videos";
    $videos = scandir($dir);
?>

<div class="slider_insta">
    <?php foreach($videos as $video): ?>
        <?php if(strpos($video, '.' ) > 0): ?>
        <div class="slider_item">
            <video width="265" height="410" controls="controls">
                <source src="videos/<?= $video ?>">
            </video>
        </div>
        <?php endif; ?>
    <?php endforeach; ?>
</div>

<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<script src="slick.min.js"></script>
<script src="script.js"></script>
</body>

