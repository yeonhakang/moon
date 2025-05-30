function updateMoonInfo() {
    navigator.geolocation.getCurrentPosition(pos => {
        const lat = pos.coords.latitude;
        const lon = pos.coords.longitude;
        const now = new Date();

        const moonPos = SunCalc.getMoonPosition(now, lat, lon);
        const moonIllum = SunCalc.getMoonIllumination(now);
        const moonTimes = SunCalc.getMoonTimes(now, lat, lon);

        const canvas = document.getElementById('moonCanvas');
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, 200, 200);

        ctx.fillStyle = "#fdd835";
        const phaseRatio = moonIllum.phase;
        const angle = Math.PI * 2 * phaseRatio;

        ctx.beginPath();
        ctx.arc(100, 100, 90, 0, angle);
        ctx.fill();

        document.getElementById("phase").textContent = (phaseRatio * 100).toFixed(1) + "%";
        document.getElementById("azimuth").textContent = (moonPos.azimuth * 180 / Math.PI).toFixed(1) + "°";
        document.getElementById("altitude").textContent = (moonPos.altitude * 180 / Math.PI).toFixed(1) + "°";
        document.getElementById("moonrise").textContent = moonTimes.rise ? moonTimes.rise.toLocaleTimeString() : "없음";
        document.getElementById("moonset").textContent = moonTimes.set ? moonTimes.set.toLocaleTimeString() : "없음";

        document.getElementById("meaning").textContent = getMeaning(phaseRatio);
    });
}

function getMeaning(phase) {
    if (phase < 0.03) return "🌑 삭 - 새로운 시작의 때";
    if (phase < 0.25) return "🌒 초승달 - 기회의 씨앗이 자라납니다";
    if (phase < 0.48) return "🌓 상현달 - 방향성을 점검할 시기";
    if (phase < 0.52) return "🌕 보름달 - 감정과 진리가 충만한 때";
    if (phase < 0.75) return "🌖 하현달 - 정리와 반성의 시간";
    if (phase < 0.97) return "🌘 그믐달 - 다음을 위한 비움";
    return "🌑 삭 - 새로운 사이클의 준비";
}

updateMoonInfo();
