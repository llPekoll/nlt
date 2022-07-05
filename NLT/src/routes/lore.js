/** @type {import('@sveltejs/kit').RequestHandler} */

export async function get() {
	const trad = {
		lore: "&emsp;&emsp;&emsp;&emsp;It all started around December 2019, Cabri-16 started to spread in the world, It have been told this virus came from\
        an some animal pagolin or bat or what ever<br />Millions of pealple started to get nasty, the uncommun property of the virus,\
        the world entered in the panic era, all the nations started to look a soltion in order to avoid the end of the human race has it was known\
        few scientist were looking for the ultimate solution against the virus <bold>'Vaccin'</bold>, and they found a <bold>'Anti-Carbi Vaccin'</bold>.\
        they started to vaccin the world, without restriction, but the vaccin didn't stop Cabri-16 from spread.\
        Eveyone though the new hope were found to save the world, but after the first thouaond vaccined people \
        varian start to emerge, the vaccin didnt't gave protection against propagation, <br /> Cabri-16 were so powerfull that he made it \
        back to animals, it made back to turtle this time, we started to see mutaion to turtles, and it virus came with a bit of the human genome this time,\
        the genome, turtles to speak and get nasty, with the hability to talk we could see Karens turtles coming, Punks, Alcooholic, somker and many more cases....\
        This is how Nasty little turtule start to appear."
	};
	return {
		body: {
			trad
		}
	};
}
