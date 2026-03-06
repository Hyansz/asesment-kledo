export async function regionLoader() {
    const res = await fetch("/data/indonesia_regions.json");
    return res.json();
}