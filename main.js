song1 = "";
song2 = "";

song1_status = "";
song2_status = "";

scoreRW = 0;
scoreLW = 0;

rWX = 0;
 rWy = 0;

lWX = 0;    lWY = 0;

function preload()
{
	song1 = loadSound("Stronger.mp3");
	song2 = loadSound("Where We Started.mp3");
}

function setup() {
	canvas =  createCanvas(600, 500);
	canvas.center();

	video = createCapture(VIDEO);
	video.hide();

	poseNet = ml5.poseNet(video, modelLoaded);
	poseNet.on('pose', gotPoses);
}

function modelLoaded() {
  console.log('PoseNet Is Initialized');
}

function gotPoses(results)
{
  if(results.length > 0)
  {
	console.log(results);
	scoreRW = results[0].pose.keypoints[10].score;
	scoreLW =  results[0].pose.keypoints[9].score;
	console.log("scoreRW = " + scoreRW + "scoreLW = " + scoreLW);
	
	rWX = results[0].pose.rightWrist.x;
	rWY = results[0].pose.rightWrist.y;
	console.log("rWX = " + rWX +" rWY = "+ rWY);

	lWX = results[0].pose.leftWrist.x;
    lWY = results[0].pose.leftWrist.y;
	console.log("lWX = " + lWX +" lWY = "+ lWY);
		
  }
}

function draw() {
	image(video, 0, 0, 600, 500);
	
	song1_status = song1.isPlaying();
	song2_status = song2.isPlaying();

	fill("#FF0000");
	stroke("#FF0000");

	if(scoreRW > 0.2)
	{ 
		circle(rWX,rWY,20);

			song2.stop();

		if(song1_status == false)
		{
			song1.play();
			document.getElementById("song").innerHTML = "Playing - Stronger";
		}
	}

	if(scoreLW > 0.2)
	{
		circle(lWX,lWY,20);

			song1.stop();

		if(song2_status == false)
		{
			song2.play();
			document.getElementById("song").innerHTML = "Playing - Where We Started";
		}
	}

}

function play()
{
	song.play();
	song.setVolume(1);
	song.rate(1);
}