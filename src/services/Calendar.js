export function formatDMY(d) {
    d = d || new Date()
    return ("0" + d.getDate()).slice(-2) + "/"
        + ("0" + (d.getMonth() + 1)).slice(-2) + "/"
        + ("000" + d.getFullYear()).slice(-4);
}