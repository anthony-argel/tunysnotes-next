import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";

const Post = () => {
    const router = useRouter();
    const { title } = router.query;

    useEffect(() => {}, []);
    return (
        <div className="flex flex-col-reverse p-4 gap-4 md:h-screen md:flex-row">
            <Head>
                <title>Put title here - Tuny&#39;s Notes</title>
            </Head>
            <div className="overflow-y-scroll p-4 md:basis-2/3">
                <div
                    dangerouslySetInnerHTML={{
                        __html: "<p id='crap'>Okay fuck</p>",
                    }}
                ></div>
                <h1>Example Post</h1>
                <h2 id="damn">Part 1</h2>
                <br></br>
                <p>
                    This is an example post. We are going to put notes and stuff
                    here.
                </p>
                <br></br>
                <p>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    Quas hic odit similique nisi ducimus. Nulla animi incidunt
                    fugit laboriosam nemo modi non porro molestias, laudantium
                    aperiam corrupti hic soluta? Laudantium. Omnis minima, ex
                    amet illo quae rerum mollitia. Eaque, optio laudantium
                    debitis, quam ad deleniti necessitatibus esse excepturi
                    sequi alias, placeat minima vel unde iure architecto dolorem
                    accusantium. Consequuntur, tenetur? Consequuntur consequatur
                    et voluptate illum optio molestiae aperiam ratione, numquam
                    doloribus velit. Necessitatibus, dolore distinctio dolor qui
                    porro modi, ad maiores corporis aliquid alias debitis
                    voluptatum atque consequatur corrupti impedit? Quis magni
                    mollitia temporibus nulla. Ab earum dolore consectetur
                    facilis, id omnis distinctio sint et fugit perferendis
                    officia aspernatur quae quaerat neque, excepturi atque
                    harum. Assumenda adipisci veniam error repudiandae? Itaque
                    nihil dolores nostrum tenetur hic blanditiis numquam,
                    officia fuga aliquid vel dolor provident aspernatur magnam
                    similique consequatur dolore eveniet enim voluptate soluta
                    modi. Veniam, ratione accusamus? Culpa, et consequatur? Aut
                    placeat quaerat modi? Laborum maiores tempore eos, accusamus
                    expedita quia quasi delectus ducimus, minima, aspernatur
                    optio! Tenetur quo iusto cum. Veritatis optio sed
                    consequatur sapiente fuga nihil inventore earum! Nobis
                    quidem sapiente blanditiis. Recusandae praesentium
                    distinctio ducimus, vitae atque eligendi, porro veniam iusto
                    natus labore sit amet sequi sint asperiores quis quo ea
                    sunt. Sed sequi facilis ipsa commodi. Quibusdam vitae,
                    magnam officiis possimus quaerat iste? Quasi odio dolorem
                    fugiat iure laudantium illum ut officia eos repudiandae fuga
                    aspernatur, soluta corporis error non! Nemo voluptas
                    molestiae recusandae vero inventore. Consequatur perferendis
                    nostrum neque tempore rerum aut at, molestiae id sed odio
                    repellat provident eum, et labore! Temporibus earum, minus
                    blanditiis vel, facere quia consequuntur doloremque
                    exercitationem nobis illo molestiae? Aspernatur labore animi
                    accusamus praesentium. Earum incidunt ut tempore rerum
                    nostrum accusamus impedit consectetur eveniet doloremque.
                    Ullam harum recusandae enim porro mollitia repellat ipsum
                    expedita similique, ab, tenetur, alias aliquid? Iste at
                    veniam quisquam aspernatur! Quod cumque quos ab id iusto
                    similique, non harum eveniet. Veritatis assumenda in facilis
                    culpa minus repudiandae optio commodi libero eligendi, totam
                    consectetur, impedit neque. Magnam praesentium ducimus et ab
                    iste vel doloribus corporis quaerat mollitia, nulla
                    veritatis quasi officia eius, itaque molestias obcaecati ex
                    debitis nostrum dicta quia. Praesentium asperiores molestiae
                    aliquid odio consequatur? Ullam deleniti facilis aliquid
                    saepe dolore rem provident veniam neque repellendus
                    mollitia, dolor inventore blanditiis excepturi minima
                    quaerat ut odio. Est omnis tenetur debitis nam consequatur
                    incidunt eius dolores corporis. Minima necessitatibus
                    dolorum debitis maiores explicabo ratione voluptatem, sequi
                    mollitia maxime voluptate sit consectetur nam eius aliquid
                    accusantium, consequuntur officiis? Odit aspernatur
                    cupiditate facere nam suscipit distinctio placeat temporibus
                    maiores! Perferendis sit dolor sed cumque molestias
                    provident temporibus maiores excepturi eligendi ipsum vitae
                    veniam ut eaque officia, vero in atque aspernatur distinctio
                    autem libero accusantium accusamus aperiam dolorum! Ratione,
                    doloribus? Ex fuga, repellat praesentium quis nihil
                    molestias quam natus laboriosam soluta consequatur
                    necessitatibus sunt ratione commodi excepturi id, dolorum
                    totam magni rerum eveniet quibusdam neque? Aspernatur ipsam
                    tempora dolor perferendis. Quos distinctio accusamus,
                    possimus corporis voluptatem aut facilis id voluptatibus
                    minus? Rem, nesciunt minus! Voluptas aut praesentium
                    repellat incidunt, eum omnis deleniti corrupti ex earum,
                    pariatur harum vero nobis quo? Doloribus repudiandae
                    voluptatum quas pariatur soluta culpa quae voluptates
                    deserunt eum ab! Iusto ipsum sed molestiae. Quaerat, rerum
                    corporis sit tempora nulla aspernatur dolor ratione
                    distinctio, tenetur similique qui quia! Adipisci ratione,
                    doloremque culpa magni, dignissimos porro eos tenetur
                    corrupti iure modi libero vero ipsam eligendi beatae error
                    minus ab odio odit dolor cumque, cupiditate suscipit.
                    Molestiae sed autem nobis? Est tempora maiores ullam id
                    impedit architecto, saepe enim natus, itaque nobis, sequi
                    commodi ab? Atque quos at deleniti quidem consequatur
                    necessitatibus illum corrupti ex laudantium. Esse voluptas
                    eum nihil? Numquam nihil impedit nesciunt quaerat minima
                    dolores dicta illum optio, architecto beatae. Cumque
                    delectus corporis quis sunt quaerat. Optio suscipit repellat
                    cupiditate distinctio aut veniam error veritatis vel
                    reprehenderit mollitia. Recusandae enim porro nemo nesciunt
                    eum totam, dignissimos earum non pariatur explicabo iste
                    veniam magnam incidunt nostrum voluptatem iure
                    necessitatibus quis tempore facere suscipit ab doloremque
                    fugit, quod aut. Obcaecati? Facilis ad veritatis tempora
                    veniam unde neque, debitis blanditiis quas excepturi natus
                    autem minima nisi minus voluptates distinctio illum
                    consequatur perspiciatis eveniet esse. Error et tenetur
                    similique, dicta quo tempore! Nisi et voluptatem voluptatum
                    incidunt! Consequuntur saepe ad magni numquam corporis non
                    cupiditate dignissimos repellat velit atque explicabo,
                    commodi vero esse ex natus dicta illum illo nihil voluptatum
                    consectetur expedita? Excepturi facere saepe accusantium
                    sunt illum molestiae vitae, officiis tempore perspiciatis
                    cupiditate eius consequuntur non doloribus mollitia est et
                    praesentium aspernatur voluptatibus in nulla? Repellat
                    corporis ullam delectus voluptatibus voluptatum? Sapiente,
                    voluptate similique quisquam eius, unde consequuntur
                    nesciunt natus, hic blanditiis quis eligendi officia
                    voluptates expedita consequatur cupiditate. Magnam, dolore.
                    Deserunt rerum est vero deleniti molestiae blanditiis quam
                    recusandae nam! Alias at mollitia laborum sequi fugiat
                    quibusdam et dolore quae architecto voluptatum illo
                    doloremque consectetur autem excepturi, fuga neque magnam
                    delectus atque dicta! Nemo nostrum delectus assumenda
                    molestiae quo iusto! Minus quisquam iusto quae, natus minima
                    repudiandae ipsum cupiditate pariatur maiores magnam non
                    facere aperiam dolores tenetur ut voluptatum fuga excepturi
                    nemo maxime corporis tempora recusandae voluptatem.
                    Necessitatibus, laborum perferendis? Necessitatibus ullam
                    eum mollitia vero nesciunt explicabo saepe quae aliquam
                    laboriosam cupiditate suscipit tenetur animi autem, eaque
                    dolores consectetur quaerat libero voluptates ad dolorem
                    quis aut corporis fugit veritatis. Quasi? Libero suscipit
                    repellendus, animi, autem nulla neque architecto omnis
                    voluptate quasi odio, aliquam minus reprehenderit laudantium
                    earum? Quis sit vero dignissimos laboriosam culpa? Harum
                    quam nostrum velit a, numquam totam.
                </p>
                <br></br>
                <h2 id="fuck">Fuck</h2>
                <p>This seems to work I guess.</p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Blanditiis laboriosam quasi dicta! At quidem quisquam ipsam
                assumenda aspernatur impedit labore necessitatibus praesentium
                nam vitae iste nemo ea, suscipit dolore natus? Esse pariatur
                consequuntur suscipit hic error! Molestias minima tempora velit
                in maxime dignissimos temporibus voluptates. Pariatur tempora
                enim vero eum soluta eveniet. Commodi quae distinctio delectus,
                error necessitatibus eveniet illum. Amet perspiciatis pariatur
                molestiae, sed cupiditate saepe optio ducimus quis odit nihil
                possimus nisi ipsum iusto itaque praesentium architecto veniam.
                Porro aperiam neque omnis minima et perspiciatis fuga
                consequuntur corrupti? Aliquam esse natus perspiciatis fugiat,
                doloribus delectus itaque error numquam, ab reiciendis, maxime
                placeat eos sequi reprehenderit quo minima non impedit adipisci
                magni fuga inventore consequatur et nobis! Quaerat, accusantium.
                Quasi eaque obcaecati fugit magni labore animi recusandae id
                reprehenderit, quos, rerum quidem laboriosam excepturi dolore
                nihil? Autem enim porro voluptas, fugit quo nemo quasi sint
                illum ea harum magnam?
            </div>
            <div className="p-4 md:basis-1/3 select-none">
                <h2>Chapter Contents</h2>
                <p>
                    <a href="#damn">Test</a>
                </p>
                <p>
                    <a href="#fuck">Test 2</a>
                </p>
            </div>
        </div>
    );
};

export default Post;
