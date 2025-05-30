function drawMoonSVG(phase) {
    const svg = document.getElementById("moon");
    const cx = 50, cy = 50, r = 48;
    let d = "";
    let fade = phase > 0.5 ? 1 - phase : phase;
    let sweepFlag = phase > 0.5 ? 1 : 0;

    d = "M " + cx + " " + (cy - r) +
        " A " + r + " " + r + " 0 1 1 " + cx + " " + (cy + r) +
        " A " + r * (1 - 2 * fade) + " " + r + " 0 0 " + sweepFlag + " " + cx + " " + (cy - r);

    svg.innerHTML = '<path d="' + d + '" fill="#FDB813"/>';
}

function updateMoonInfo() {
    const now = new Date();
    const lat = 37.5665;
    const lon = 126.9780;

    const moonIllum = SunCalc.getMoonIllumination(now);
    const moonPos = SunCalc.getMoonPosition(now, lat, lon);
    const moonTimes = SunCalc.getMoonTimes(now, lat, lon);

    drawMoonSVG(moonIllum.phase);

    document.getElementById("phase").innerText = `위상: ${(moonIllum.fraction * 100).toFixed(1)}%`;
    document.getElementById("azimuth").innerText = `방향: ${(moonPos.azimuth * 180 / Math.PI + 180).toFixed(1)}°`;
    document.getElementById("altitude").innerText = `고도: ${(moonPos.altitude * 180 / Math.PI).toFixed(1)}°`;
    document.getElementById("riseSet").innerText =
        `출: ${moonTimes.rise?.toLocaleTimeString('ko-KR') || '없음'} / ` +
        `몰: ${moonTimes.set?.toLocaleTimeString('ko-KR') || '없음'}`;
    document.getElementById("description").innerText =
        moonIllum.phase < 0.25 ? "🌒 초승달 - 기회의 씨앗이 자라납니다" :
        moonIllum.phase < 0.5 ? "🌓 상현달 - 점점 에너지가 차오릅니다" :
        moonIllum.phase < 0.75 ? "🌖 하현달 - 성찰과 정리의 시간입니다" :
        "🌘 그믐달 - 내면의 평화를 준비하세요";
}

updateMoonInfo();