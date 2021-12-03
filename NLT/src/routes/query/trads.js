export async function get({ params }) {
    const trad = {
            heroTittle:"willmase willmase",
            history:"Here is the story",
    }
    console.log(trad)
    return {
        status: 200,
        body: JSON.stringify(trad)
    };
}
