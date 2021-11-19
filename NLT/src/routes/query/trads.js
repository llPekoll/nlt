export async function get({ params }) {
    const trad = {
        hero:{
            heroTittle:"willmase willmase",
        }
    }
    console.log(trad)
    return {
        status: 200,
        body: JSON.stringify(trad)
    };
}
