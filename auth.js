// auth.js
function checkAuth(message) {
    fetch("/api/profile")
        .then((res) => {
            if (res.ok) {
                return res.json();
            }
            throw new Error("Not authenticated");
        })
        .then((data) => {
            if (data.status !== "success") {
                alert(message);
                window.location.href = 'index.html';
            }
        })
        .catch(() => {
            alert(message);
            window.location.href = 'index.html';
        });
}

