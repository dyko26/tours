/*
 * Guia de Campo Chachagua / Chachagua Field Guide
 * Base de datos local bilingue (ES / EN). Cada texto es un objeto { es, en }.
 * Estructura de cada entrada:
 *   id, cat, kind ('taxon' | 'article'), sci (string o {es,en}),
 *   taxonomy {kingdom, phylum, class, order, family, genus, species} (taxones),
 *   facts [{ k:{es,en}, v:{es,en} }] (ficha tecnica adicional),
 *   iucn (codigo UICN), name, desc, diet, behavior, role.
 */
(function () {
  'use strict';
  const L = (es, en) => ({ es, en });

  const categories = [
    { id: 'ecosystem', icon: 'mountain', name: L('Ecosistema', 'Ecosystem'),
      desc: L('Geología, zona de vida y conectividad del paisaje.', 'Geology, life zone and landscape connectivity.') },
    { id: 'hydrology', icon: 'droplet', name: L('Hidrología', 'Hydrology'),
      desc: L('Dinámica fluvial, bosque ribereño y bioindicación acuática.', 'Fluvial dynamics, riparian forest and aquatic bioindication.') },
    { id: 'mammals', icon: 'paw', name: L('Mamíferos', 'Mammals'),
      desc: L('Xenartros arborícolas y primates del dosel.', 'Arboreal xenarthrans and canopy primates.') },
    { id: 'amphibians', icon: 'frog', name: L('Anfibios', 'Amphibians'),
      desc: L('Anuros arborícolas y bioindicadores de quebradas.', 'Arboreal anurans and stream bioindicators.') },
    { id: 'reptiles', icon: 'snake', name: L('Reptiles', 'Reptiles'),
      desc: L('Saurios ribereños, cocodrílidos y ofidios locales.', 'Riparian lizards, crocodilians and local snakes.') },
    { id: 'insects', icon: 'bug', name: L('Insectos', 'Insects'),
      desc: L('Lepidópteros, hormigas cortadoras, bioluminiscencia y descomposición.', 'Lepidoptera, leaf-cutter ants, bioluminescence and decomposition.') },
    { id: 'flora', icon: 'leaf', name: L('Flora', 'Flora'),
      desc: L('Hemiepífitas, emergentes, epífitas y heliconias.', 'Hemiepiphytes, emergents, epiphytes and heliconias.') },
    { id: 'funga', icon: 'mushroom', name: L('Funga', 'Funga'),
      desc: L('Basidiomicetos lignícolas y redes miceliales del sotobosque.', 'Wood-decay basidiomycetes and understory mycelial networks.') }
  ];

  const entries = [
    /* ===================== ECOSISTEMA ===================== */
    {
      id: 'eco-geology', cat: 'ecosystem', kind: 'article',
      sci: L('Piedemonte norte de la Cordillera de Tilarán', 'Northern piedmont of the Cordillera de Tilarán'),
      name: L('Geología y suelos de La Pechuga', 'Geology and Soils of La Pechuga'),
      facts: [
        { k: L('Provincia geológica', 'Geological setting'), v: L('Arco volcánico neógeno-cuaternario', 'Neogene-Quaternary volcanic arc') },
        { k: L('Sustrato dominante', 'Dominant substrate'), v: L('Lavas andesíticas, brechas y tefras', 'Andesitic lavas, breccias and tephra') },
        { k: L('Órdenes de suelo', 'Soil orders'), v: L('Ultisoles, Inceptisoles, Andisoles', 'Ultisols, Inceptisols, Andisols') },
        { k: L('Elevación aproximada', 'Approximate elevation'), v: L('250 - 600 m s.n.m.', '250 - 600 m a.s.l.') }
      ],
      desc: L(
        `El sector de La Pechuga se asienta en la transición entre el piedemonte septentrional de la Cordillera de Tilarán y las llanuras de San Carlos. El basamento corresponde a secuencias volcánicas andesíticas y basálticas del Neógeno (asociadas regionalmente al Grupo Aguacate), recubiertas por depósitos piroclásticos cuaternarios y aluviones de origen volcánico. La topografía es ondulada a quebrada, con laderas disectadas por quebradas de régimen permanente.`,
        `The La Pechuga sector lies at the transition between the northern piedmont of the Cordillera de Tilarán and the San Carlos plains. The basement consists of Neogene andesitic and basaltic volcanic sequences (regionally associated with the Aguacate Group), overlain by Quaternary pyroclastic deposits and alluvium of volcanic origin. Topography is rolling to steep, with slopes dissected by perennial streams.`
      ),
      diet: L(
        `Bajo precipitaciones superiores a 3500 mm anuales la meteorización química es intensa: predominan arcillas caoliníticas y óxidos de hierro y aluminio. Los Ultisoles son ácidos, de baja capacidad de intercambio catiónico y con posible toxicidad por aluminio; los Andisoles, derivados de cenizas recientes, presentan alta retención de fósforo por alófana. En consecuencia, la mayor parte de los nutrientes del sistema reside en la biomasa y no en el suelo mineral.`,
        `With rainfall above 3500 mm per year, chemical weathering is intense: kaolinitic clays and iron and aluminum oxides dominate. Ultisols are acidic, with low cation exchange capacity and potential aluminum toxicity; Andisols, derived from recent ash, show high phosphorus fixation by allophane. Consequently, most of the system nutrients reside in the biomass rather than in the mineral soil.`
      ),
      behavior: L(
        `Durante el recorrido a caballo observe los cortes de camino: horizontes rojizos a amarillentos indican Ultisoles muy meteorizados, mientras que perfiles oscuros, ligeros y untuosos al tacto sugieren influencia de cenizas. En los cauces, los cantos rodados de andesita gris y las brechas expuestas permiten reconstruir la historia volcánica local. Las laderas saturadas son propensas a deslizamientos superficiales tras lluvias prolongadas.`,
        `While riding, examine road cuts: reddish to yellowish horizons indicate highly weathered Ultisols, whereas dark, light, greasy-textured profiles suggest ash influence. In stream beds, rounded gray andesite cobbles and exposed breccias allow reconstruction of local volcanic history. Saturated slopes are prone to shallow landslides after prolonged rainfall.`
      ),
      role: L(
        `La pobreza química del suelo explica estrategias biológicas clave del bosque: raíces superficiales densas, asociaciones micorrícicas arbusculares, reciclaje rápido de hojarasca y alta inversión en defensas foliares. La remoción de la cobertura forestal expone estos suelos a erosión laminar y pérdida irreversible de fertilidad, lo que justifica la protección de laderas con pendientes pronunciadas.`,
        `Soil chemical poverty explains key forest strategies: dense superficial roots, arbuscular mycorrhizal associations, rapid litter recycling and high investment in leaf defenses. Removal of forest cover exposes these soils to sheet erosion and irreversible fertility loss, which justifies the protection of steep slopes.`
      )
    },
    {
      id: 'eco-forest', cat: 'ecosystem', kind: 'article',
      sci: L('Bosque muy húmedo Tropical, transición a Premontano (Holdridge)', 'Tropical Wet Forest, transition to Premontane (Holdridge)'),
      name: L('Bosque muy húmedo tropical de transición', 'Transitional Tropical Wet Forest'),
      facts: [
        { k: L('Zona de vida', 'Life zone'), v: L('bmh-T transición a P', 'Tropical Wet, premontane transition') },
        { k: L('Precipitación anual', 'Annual rainfall'), v: L('3500 - 5000 mm', '3500 - 5000 mm') },
        { k: L('Temperatura media', 'Mean temperature'), v: L('23 - 26 °C', '23 - 26 °C') },
        { k: L('Estación menos lluviosa', 'Less rainy season'), v: L('Febrero - abril (no marcada)', 'February - April (weak)') }
      ],
      desc: L(
        `Según el sistema de zonas de vida de Holdridge, el área corresponde al bosque muy húmedo Tropical en transición hacia el Premontano, condicionado por la vertiente caribeña y la influencia de los vientos alisios que descargan humedad contra la Cordillera de Tilarán. No existe un período seco efectivo; la evapotranspiración potencial es ampliamente superada por la precipitación, generando excedentes hídricos durante todo el año.`,
        `Under the Holdridge life zone system, the area corresponds to Tropical Wet Forest transitioning to Premontane, shaped by the Caribbean slope and the trade winds that release moisture against the Cordillera de Tilarán. There is no effective dry period; potential evapotranspiration is greatly exceeded by rainfall, generating water surpluses year-round.`
      ),
      diet: L(
        `La estructura vertical comprende un dosel de 30 a 40 m con emergentes superiores a 45 m, un subdosel denso, un estrato de palmas y un sotobosque umbrófilo. Son características Pentaclethra macroloba (gavilán), Dipteryx oleifera (almendro), Carapa guianensis, Virola koschnyi y palmas como Welfia regia, Socratea exorrhiza e Iriartea deltoidea. La carga epífita aumenta con la altitud, marcando la transición premontana.`,
        `Vertical structure comprises a 30 to 40 m canopy with emergents above 45 m, a dense subcanopy, a palm stratum and a shade-tolerant understory. Characteristic taxa include Pentaclethra macroloba, Dipteryx oleifera (almendro), Carapa guianensis, Virola koschnyi and palms such as Welfia regia, Socratea exorrhiza and Iriartea deltoidea. Epiphyte load increases with elevation, marking the premontane transition.`
      ),
      behavior: L(
        `La dinámica del bosque está regida por la formación de claros: la caída de árboles por viento o saturación del suelo abre parches de luz colonizados por pioneras (Cecropia, Ochroma pyramidale, Heliconia). En el recorrido se distinguen mosaicos de bosque primario intervenido, bosque secundario de distintas edades y potreros con árboles remanentes, cada uno con ensambles faunísticos diferenciados.`,
        `Forest dynamics are driven by gap formation: treefalls from wind or soil saturation open light patches colonized by pioneers (Cecropia, Ochroma pyramidale, Heliconia). Along the ride one can distinguish mosaics of logged primary forest, secondary forest of different ages and pastures with remnant trees, each with distinct faunal assemblages.`
      ),
      role: L(
        `Este bosque de transición concentra una diversidad beta elevada por la superposición de elementos de tierras bajas caribeñas y de bosque premontano. El almendro (Dipteryx oleifera) es recurso crítico para la lapa verde (Ara ambiguus), especie en peligro. La fragmentación por ganadería y monocultivos constituye la principal amenaza regional.`,
        `This transitional forest concentrates high beta diversity through the overlap of Caribbean lowland and premontane elements. The almendro (Dipteryx oleifera) is a critical resource for the endangered Great Green Macaw (Ara ambiguus). Fragmentation by cattle ranching and monocultures is the main regional threat.`
      )
    },
    {
      id: 'eco-corridors', cat: 'ecosystem', kind: 'article',
      sci: L('Conectividad Tilarán - Llanuras de San Carlos', 'Tilarán - San Carlos Plains connectivity'),
      name: L('Corredores biológicos', 'Biological Corridors'),
      facts: [
        { k: L('Marco institucional', 'Institutional framework'), v: L('SINAC - Programa Nacional de Corredores Biológicos', 'SINAC - National Biological Corridors Program') },
        { k: L('Instrumento financiero', 'Financial instrument'), v: L('Pago por Servicios Ambientales (FONAFIFO)', 'Payment for Environmental Services (FONAFIFO)') },
        { k: L('Gradiente', 'Gradient'), v: L('Altitudinal y latitudinal', 'Altitudinal and latitudinal') }
      ],
      desc: L(
        `Chachagua se ubica en la zona de amortiguamiento entre el macizo forestal de la Cordillera de Tilarán (Bosque Eterno de los Niños, Reserva Biológica Alberto Manuel Brenes, Corredor Biológico Paso de las Nubes como contexto regional) y los fragmentos de las llanuras del norte. Los remanentes boscosos, cercas vivas y bosques ribereños de La Pechuga funcionan como elementos de paso dentro de esta matriz agropecuaria.`,
        `Chachagua lies in the buffer zone between the forest massif of the Cordillera de Tilarán (Children's Eternal Rainforest, Alberto Manuel Brenes Biological Reserve, with the Paso de las Nubes Biological Corridor as regional context) and the fragments of the northern plains. The forest remnants, living fences and riparian forests of La Pechuga act as stepping stones within this agricultural matrix.`
      ),
      diet: L(
        `Los corredores permiten flujo génico, recolonización de parches y desplazamientos estacionales. Destacan los migrantes altitudinales como el pájaro campana (Procnias tricarunculatus) y diversos colibríes y tángaras que descienden a tierras bajas en la estación no reproductiva. Mamíferos de amplio ámbito (Puma concolor, Leopardus pardalis, Tapirus bairdii en el macizo) dependen de la continuidad del dosel y de los cauces.`,
        `Corridors enable gene flow, patch recolonization and seasonal movements. Notable are altitudinal migrants such as the Three-wattled Bellbird (Procnias tricarunculatus) and several hummingbirds and tanagers that descend to the lowlands in the non-breeding season. Wide-ranging mammals (Puma concolor, Leopardus pardalis, Tapirus bairdii in the massif) depend on canopy and stream continuity.`
      ),
      behavior: L(
        `En campo, evalúe la conectividad observando la continuidad del dosel sobre el camino (puentes naturales para perezosos y monos), la presencia de cercas vivas de Gliricidia, Erythrina o Bursera y la anchura del bosque ribereño. Rastros, huellas en el lodo y cruces de fauna en vados son indicadores directos del uso del corredor.`,
        `In the field, assess connectivity by observing canopy continuity over the trail (natural bridges for sloths and monkeys), living fences of Gliricidia, Erythrina or Bursera, and riparian forest width. Tracks, footprints in mud and wildlife crossings at fords are direct indicators of corridor use.`
      ),
      role: L(
        `La conectividad amortigua los efectos del cambio climático al permitir el desplazamiento altitudinal de las especies. Las fincas privadas son actores esenciales: la regeneración natural en potreros abandonados y la protección de las franjas ribereñas exigidas por la Ley Forestal 7575 constituyen las acciones de mayor impacto en el paisaje local.`,
        `Connectivity buffers climate change effects by allowing altitudinal shifts of species. Private farms are essential actors: natural regeneration in abandoned pastures and protection of riparian strips required by Forestry Law 7575 are the highest-impact actions in the local landscape.`
      )
    },

    /* ===================== HIDROLOGIA ===================== */
    {
      id: 'hydro-river', cat: 'hydrology', kind: 'article',
      sci: L('Cuenca del río San Carlos - vertiente del Caribe', 'San Carlos River basin - Caribbean slope'),
      name: L('Dinámica del río local', 'Local River Dynamics'),
      facts: [
        { k: L('Vertiente', 'Drainage'), v: L('Caribe (vía río San Juan)', 'Caribbean (via San Juan River)') },
        { k: L('Régimen', 'Regime'), v: L('Perenne, torrencial, respuesta rápida', 'Perennial, torrential, flashy') },
        { k: L('Lecho', 'Bed'), v: L('Bloques y cantos volcánicos', 'Volcanic boulders and cobbles') },
        { k: L('Morfología', 'Morphology'), v: L('Secuencias rápido - poza', 'Riffle - pool sequences') }
      ],
      desc: L(
        `Los ríos y quebradas de La Pechuga drenan hacia la cuenca del río San Carlos, tributario del río San Juan y, finalmente, del mar Caribe. Son cauces de piedemonte con pendiente moderada, lecho de bloques y cantos de andesita, y una alternancia marcada de rápidos, correntadas y pozas. El agua es típicamente clara, fría en relación con la temperatura del aire, y bien oxigenada.`,
        `The rivers and streams of La Pechuga drain into the San Carlos River basin, a tributary of the San Juan River and ultimately the Caribbean Sea. They are piedmont channels with moderate gradient, beds of andesite boulders and cobbles, and a marked alternation of riffles, runs and pools. The water is typically clear, cool relative to air temperature and well oxygenated.`
      ),
      diet: L(
        `El hidrograma es de respuesta rápida: tormentas convectivas en las cabeceras generan crecidas súbitas ("cabezas de agua") en minutos, con aumento brusco del caudal, la turbidez y el transporte de sedimento. Estas perturbaciones reorganizan el lecho, depositan barras de grava, socavan márgenes y renuevan hábitats. La materia orgánica alóctona (hojarasca, madera) es la base energética principal de la red trófica acuática.`,
        `The hydrograph is flashy: convective storms in the headwaters generate sudden floods ("cabezas de agua") within minutes, with abrupt increases in discharge, turbidity and sediment transport. These disturbances reorganize the bed, deposit gravel bars, undercut banks and renew habitats. Allochthonous organic matter (leaf litter, wood) is the main energy base of the aquatic food web.`
      ),
      behavior: L(
        `Seguridad en vados a caballo: no cruce si el agua está turbia, si aumenta el ruido del cauce, si arrastra ramas o si llueve intensamente aguas arriba aunque en el sitio no llueva. Observe en pozas peces como la machaca (Brycon spp.), sardinas (Astyanax), barbudos (Rhamdia) y guapotes (Parachromis). En las márgenes son frecuentes Basiliscus plumifrons, martines pescadores y el ave sol (Eurypyga helias).`,
        `Horseback ford safety: do not cross if water is turbid, if stream noise increases, if it carries branches, or if heavy rain is falling upstream even when it is not raining on site. In pools observe fish such as machaca (Brycon spp.), tetras (Astyanax), catfish (Rhamdia) and guapotes (Parachromis). Along banks, Basiliscus plumifrons, kingfishers and the Sunbittern (Eurypyga helias) are frequent.`
      ),
      role: L(
        `El río estructura el paisaje: es eje de corredores, fuente de agua para fauna y comunidades, y regulador microclimático. La nutria neotropical (Lontra longicaudis) es indicadora de ríos de buena calidad. Las principales amenazas son la extracción de material de cauce, la escorrentía agroquímica y la deforestación ribereña.`,
        `The river structures the landscape: it is a corridor axis, water source for wildlife and communities, and microclimatic regulator. The Neotropical otter (Lontra longicaudis) indicates good-quality rivers. Main threats are streambed material extraction, agrochemical runoff and riparian deforestation.`
      )
    },
    {
      id: 'hydro-riparian', cat: 'hydrology', kind: 'article',
      sci: L('Ecotono ribereño y macroinvertebrados acuáticos', 'Riparian ecotone and aquatic macroinvertebrates'),
      name: L('Bosque ribereño y bioindicadores', 'Riparian Forest and Bioindicators'),
      facts: [
        { k: L('Índice oficial', 'Official index'), v: L('BMWP-CR (Decreto 33903-MINAE-S)', 'BMWP-CR (Decree 33903-MINAE-S)') },
        { k: L('Taxones sensibles', 'Sensitive taxa'), v: L('Ephemeroptera, Plecoptera, Trichoptera', 'Ephemeroptera, Plecoptera, Trichoptera') },
        { k: L('Protección legal', 'Legal protection'), v: L('Ley Forestal 7575, art. 33', 'Forestry Law 7575, art. 33') }
      ],
      desc: L(
        `El bosque ribereño es la franja de vegetación que interactúa directamente con el cauce. Sombrea el agua y regula su temperatura, estabiliza márgenes mediante sistemas radiculares, filtra sedimentos y nutrientes de la escorrentía y aporta hojarasca y madera que generan heterogeneidad de hábitat. Especies frecuentes incluyen Ficus spp., Inga spp., Zygia longifolia y Pterocarpus officinalis en sitios anegables.`,
        `Riparian forest is the vegetation strip that interacts directly with the channel. It shades the water and regulates its temperature, stabilizes banks with root systems, filters sediments and nutrients from runoff, and supplies litter and wood that create habitat heterogeneity. Frequent species include Ficus spp., Inga spp., Zygia longifolia and Pterocarpus officinalis in flood-prone sites.`
      ),
      diet: L(
        `Los macroinvertebrados se organizan en grupos funcionales: fragmentadores (larvas de Trichoptera, crustáceos), colectores, raspadores y depredadores (Odonata, Megaloptera como Corydalus). Las ninfas de Plecoptera (Anacroneuria) y de Ephemeroptera (Thraulodes, Baetidae) requieren alta oxigenación; su ausencia indica degradación. El índice BMWP-CR asigna puntajes por familia para clasificar la calidad del agua.`,
        `Macroinvertebrates are organized into functional feeding groups: shredders (Trichoptera larvae, crustaceans), collectors, scrapers and predators (Odonata, Megaloptera such as Corydalus). Plecoptera nymphs (Anacroneuria) and Ephemeroptera nymphs (Thraulodes, Baetidae) require high oxygen; their absence indicates degradation. The BMWP-CR index assigns family scores to classify water quality.`
      ),
      behavior: L(
        `Un muestreo rápido consiste en levantar cantos en un rápido sosteniendo una red aguas abajo y examinar los organismos en una bandeja clara, devolviéndolos de inmediato. La presencia de estuches de Trichoptera, ninfas aplanadas de Ephemeroptera y Plecoptera indica buena calidad; el predominio de Chironomidae rojos y oligoquetos sugiere contaminación orgánica.`,
        `A rapid assessment consists of lifting cobbles in a riffle while holding a net downstream and examining organisms in a pale tray, returning them immediately. The presence of Trichoptera cases and flattened Ephemeroptera and Plecoptera nymphs indicates good quality; dominance of red Chironomidae and oligochaetes suggests organic pollution.`
      ),
      role: L(
        `La Ley Forestal 7575 (art. 33) declara áreas de protección franjas de 15 m en zona rural en terreno plano y de 50 m en terreno quebrado a cada lado de ríos y quebradas, y un radio de 100 m alrededor de nacientes permanentes. Estas franjas son a la vez corredores lineales y la defensa más eficaz contra la erosión y la sedimentación.`,
        `Forestry Law 7575 (art. 33) designates protection strips of 15 m in rural flat terrain and 50 m in steep terrain on each side of rivers and streams, and a 100 m radius around permanent springs. These strips are both linear corridors and the most effective defense against erosion and sedimentation.`
      )
    },

    /* ===================== MAMIFEROS ===================== */
    {
      id: 'bradypus-variegatus', cat: 'mammals', kind: 'taxon', iucn: 'LC',
      sci: 'Bradypus variegatus',
      name: L('Perezoso de tres dedos', 'Brown-throated Three-toed Sloth'),
      taxonomy: { kingdom: 'Animalia', phylum: 'Chordata', class: 'Mammalia', order: 'Pilosa', family: 'Bradypodidae', genus: 'Bradypus', species: 'B. variegatus' },
      facts: [
        { k: L('Masa corporal', 'Body mass'), v: L('2.2 - 6.3 kg', '2.2 - 6.3 kg') },
        { k: L('Temperatura corporal', 'Body temperature'), v: L('30 - 34 °C (heterotermia)', '30 - 34 °C (heterothermy)') },
        { k: L('Vértebras cervicales', 'Cervical vertebrae'), v: L('8 - 9', '8 - 9') }
      ],
      desc: L(
        `Xenartro arborícola de pelaje pardo grisáceo con máscara facial oscura y garganta parda; los machos presentan un espéculo dorsal anaranjado con una franja negra central. Posee tres garras largas en cada extremidad anterior y entre 8 y 9 vértebras cervicales, lo que le permite rotar la cabeza cerca de 270 grados. Su pelaje alberga algas (Trichophilus), hongos y polillas comensales (Cryptoses).`,
        `Arboreal xenarthran with grayish-brown fur, a dark facial mask and brown throat; males bear an orange dorsal speculum with a central black stripe. It has three long claws on each forelimb and 8 to 9 cervical vertebrae, allowing it to rotate the head about 270 degrees. Its fur hosts algae (Trichophilus), fungi and commensal moths (Cryptoses).`
      ),
      diet: L(
        `Folívoro estricto. Consume hojas, brotes y yemas de numerosas especies arbóreas, con preferencia por Cecropia spp. y lianas. La digestión ocurre en un estómago multicameral con fermentación microbiana y puede requerir más de una semana. Su metabolismo basal es aproximadamente la mitad del esperado para un mamífero de su tamaño.`,
        `Strict folivore. It eats leaves, shoots and buds of many tree species, with a preference for Cecropia spp. and lianas. Digestion takes place in a multichambered stomach with microbial fermentation and may take over a week. Its basal metabolic rate is roughly half that expected for a mammal of its size.`
      ),
      behavior: L(
        `Activo tanto de día como de noche, con largos períodos de reposo y termorregulación conductual mediante asoleamiento en la copa. Desciende al suelo aproximadamente una vez por semana para defecar en la base del árbol, momento de alta vulnerabilidad ante depredadores. Es solitario; las hembras crían una sola cría que permanece con ella varios meses. Búsquelo en Cecropia de copas abiertas a lo largo del camino.`,
        `Active both day and night, with long resting periods and behavioral thermoregulation by sunbathing in the crown. It descends to the ground about once a week to defecate at the base of the tree, a moment of high vulnerability to predators. It is solitary; females raise a single young that remains with them for several months. Look for it in open-crowned Cecropia along the trail.`
      ),
      role: L(
        `Representa una fracción importante de la biomasa de vertebrados arborícolas y contribuye al reciclaje de nutrientes al depositar heces en la base de los árboles. Es presa del águila arpía y de grandes felinos. Amenazas locales: fragmentación del dosel, electrocución en tendidos eléctricos, atropellos y ataques de perros cuando cruza por el suelo.`,
        `It accounts for a significant fraction of arboreal vertebrate biomass and contributes to nutrient cycling by depositing feces at tree bases. It is prey for the Harpy Eagle and large cats. Local threats: canopy fragmentation, electrocution on power lines, road kills and dog attacks when crossing on the ground.`
      )
    },
    {
      id: 'choloepus-hoffmanni', cat: 'mammals', kind: 'taxon', iucn: 'LC',
      sci: 'Choloepus hoffmanni',
      name: L('Perezoso de dos dedos', "Hoffmann's Two-toed Sloth"),
      taxonomy: { kingdom: 'Animalia', phylum: 'Chordata', class: 'Mammalia', order: 'Pilosa', family: 'Choloepodidae', genus: 'Choloepus', species: 'C. hoffmanni' },
      facts: [
        { k: L('Masa corporal', 'Body mass'), v: L('4 - 8 kg', '4 - 8 kg') },
        { k: L('Actividad', 'Activity'), v: L('Nocturna y crepuscular', 'Nocturnal and crepuscular') },
        { k: L('Vértebras cervicales', 'Cervical vertebrae'), v: L('5 - 7', '5 - 7') }
      ],
      desc: L(
        `De mayor tamaño que el perezoso de tres dedos, con pelaje largo pardo amarillento, rostro claro y hocico prominente. Presenta dos garras en las extremidades anteriores y tres en las posteriores, y carece de cola visible. Posee dientes caniniformes desarrollados. Su linaje se separó del de Bradypus hace más de 30 millones de años: la arborealidad suspensoria evolucionó de forma convergente.`,
        `Larger than the three-toed sloth, with long yellowish-brown fur, a pale face and prominent snout. It has two claws on the forelimbs and three on the hindlimbs, and lacks a visible tail. It has well-developed caniniform teeth. Its lineage diverged from Bradypus over 30 million years ago: suspensory arboreality evolved convergently.`
      ),
      diet: L(
        `Dieta más generalista que Bradypus: hojas, brotes, flores, frutos y ocasionalmente pequeños invertebrados o huevos. Esta flexibilidad trófica le permite ocupar bosques secundarios, cercas vivas y fragmentos alterados con mayor éxito.`,
        `More generalist diet than Bradypus: leaves, shoots, flowers, fruits and occasionally small invertebrates or eggs. This trophic flexibility allows it to occupy secondary forests, living fences and disturbed fragments more successfully.`
      ),
      behavior: L(
        `Principalmente nocturno; durante el día permanece enroscado en bifurcaciones o enredaderas densas, por lo que su detección diurna exige observar masas oscuras en el subdosel. Puede defenderse con mordidas y zarpazos. Las hembras paren una cría tras una gestación cercana a 11 meses.`,
        `Mainly nocturnal; during the day it remains curled in forks or dense vine tangles, so daytime detection requires scanning for dark masses in the subcanopy. It can defend itself with bites and swipes. Females give birth to a single young after a gestation of about 11 months.`
      ),
      role: L(
        `Folívoro-frugívoro que contribuye a la poda del dosel y a la dispersión limitada de semillas. Su presencia en fragmentos depende de la conectividad arbórea; los pasos de fauna aéreos y la poda responsable de tendidos eléctricos reducen su mortalidad.`,
        `Folivore-frugivore that contributes to canopy pruning and limited seed dispersal. Its persistence in fragments depends on arboreal connectivity; canopy bridges and responsible pruning near power lines reduce its mortality.`
      )
    },
    {
      id: 'alouatta-palliata', cat: 'mammals', kind: 'taxon', iucn: 'VU',
      sci: 'Alouatta palliata',
      name: L('Mono aullador de manto', 'Mantled Howler Monkey'),
      taxonomy: { kingdom: 'Animalia', phylum: 'Chordata', class: 'Mammalia', order: 'Primates', family: 'Atelidae', genus: 'Alouatta', species: 'A. palliata' },
      facts: [
        { k: L('Masa corporal', 'Body mass'), v: L('4.5 - 9.8 kg', '4.5 - 9.8 kg') },
        { k: L('Tamaño de tropa', 'Troop size'), v: L('5 - 20 individuos', '5 - 20 individuals') },
        { k: L('Apéndice CITES', 'CITES Appendix'), v: L('I', 'I') }
      ],
      desc: L(
        `Primate atélido robusto de pelaje negro con flecos dorados a lo largo de los flancos (manto). Posee cola prensil con una almohadilla desnuda en el extremo y un hueso hioides hipertrofiado que actúa como cámara de resonancia, produciendo vocalizaciones audibles a más de un kilómetro. Presenta visión tricromática rutinaria, inusual entre los primates del Nuevo Mundo.`,
        `Robust atelid primate with black fur and golden fringes along the flanks (mantle). It has a prehensile tail with a bare pad at the tip and a hypertrophied hyoid bone acting as a resonance chamber, producing calls audible over a kilometer away. It has routine trichromatic vision, unusual among New World primates.`
      ),
      diet: L(
        `Folívoro-frugívoro. Consume principalmente hojas jóvenes, complementadas con frutos (especialmente de Ficus), flores y pecíolos. Selecciona hojas con mayor contenido proteico y menor concentración de taninos. La fermentación en el colon le permite aprovechar la celulosa.`,
        `Folivore-frugivore. It eats mainly young leaves, supplemented with fruits (especially Ficus), flowers and petioles. It selects leaves with higher protein content and lower tannin concentrations. Colonic fermentation allows it to exploit cellulose.`
      ),
      behavior: L(
        `Vive en tropas multimacho-multihembra. Los coros al amanecer y antes de las tormentas cumplen funciones de espaciamiento intergrupal y defensa de recursos. Pasa hasta el 70 por ciento del día en reposo como estrategia de ahorro energético. Es frecuente detectarlo primero por la vocalización y luego en el dosel de Ficus y Ceiba cercanos al río. Evite permanecer bajo la tropa.`,
        `It lives in multimale-multifemale troops. Choruses at dawn and before storms serve intergroup spacing and resource defense. It spends up to 70 percent of the day resting as an energy-saving strategy. It is often detected first by its call and then in the canopy of Ficus and Ceiba near the river. Avoid standing directly beneath the troop.`
      ),
      role: L(
        `Dispersor de semillas de gran tamaño y agente de poda del dosel; sus heces alimentan a escarabajos estercoleros que entierran semillas (dispersión secundaria). La UICN lo clasifica como Vulnerable a nivel de especie. Amenazas: fragmentación, electrocución, fiebre amarilla y captura ilegal.`,
        `Large-seed disperser and canopy pruning agent; its feces feed dung beetles that bury seeds (secondary dispersal). IUCN lists it as Vulnerable at species level. Threats: fragmentation, electrocution, yellow fever and illegal capture.`
      )
    },

    /* ===================== ANFIBIOS ===================== */
    {
      id: 'agalychnis-callidryas', cat: 'amphibians', kind: 'taxon', iucn: 'LC',
      sci: 'Agalychnis callidryas',
      name: L('Rana verde de ojos rojos', 'Red-eyed Treefrog'),
      taxonomy: { kingdom: 'Animalia', phylum: 'Chordata', class: 'Amphibia', order: 'Anura', family: 'Phyllomedusidae', genus: 'Agalychnis', species: 'A. callidryas' },
      facts: [
        { k: L('Longitud hocico-cloaca', 'Snout-vent length'), v: L('Machos 40 - 56 mm; hembras 55 - 71 mm', 'Males 40 - 56 mm; females 55 - 71 mm') },
        { k: L('Actividad', 'Activity'), v: L('Nocturna', 'Nocturnal') },
        { k: L('Reproducción', 'Breeding'), v: L('Estación lluviosa, sobre cuerpos de agua lénticos', 'Rainy season, over standing water') }
      ],
      desc: L(
        `Hílido filomedúsido de dorso verde brillante, flancos con barras verticales azul violáceo y amarillo, ojos rojos con pupila vertical y discos digitales anaranjados. Su piel contiene péptidos bioactivos. El párpado inferior reticulado (membrana nictitante) permite cierta visión mientras reposa camuflada.`,
        `Phyllomedusid treefrog with a bright green dorsum, flanks with violet-blue and yellow vertical bars, red eyes with vertical pupils and orange toe discs. Its skin contains bioactive peptides. The reticulated lower eyelid (nictitating membrane) allows some vision while it rests camouflaged.`
      ),
      diet: L(
        `Depredador nocturno de artrópodos: grillos, polillas, moscas y arañas, capturados por emboscada en la vegetación. Los renacuajos son suspensívoros y detritívoros en charcas temporales y pantanos.`,
        `Nocturnal arthropod predator: crickets, moths, flies and spiders, captured by ambush in vegetation. Tadpoles are suspension feeders and detritivores in temporary ponds and swamps.`
      ),
      behavior: L(
        `Durante el día duerme adherida al envés de hojas con las extremidades recogidas, ocultando los colores conspicuos. Si es perturbada, abre súbitamente los ojos y expone los flancos (despliegue de sobresalto). Las puestas se adhieren a hojas sobre el agua; los embriones pueden eclosionar prematuramente al detectar las vibraciones de serpientes depredadoras (Leptodeira) o avispas, un caso clásico de plasticidad fenotípica.`,
        `By day it sleeps attached to leaf undersides with limbs tucked in, hiding its conspicuous colors. If disturbed, it suddenly opens its eyes and exposes the flanks (startle display). Clutches are attached to leaves above water; embryos can hatch prematurely upon detecting vibrations of predatory snakes (Leptodeira) or wasps, a classic case of phenotypic plasticity.`
      ),
      role: L(
        `Controlador de poblaciones de insectos y presa de serpientes, murciélagos y aves. Depende de charcas y humedales permanentes o estacionales; el drenaje de potreros y la contaminación por agroquímicos son amenazas locales. Su observación nocturna requiere linterna con luz tenue y sin manipulación.`,
        `Controls insect populations and is prey for snakes, bats and birds. It depends on permanent or seasonal ponds and wetlands; pasture drainage and agrochemical pollution are local threats. Night observation requires a dim light and no handling.`
      )
    },
    {
      id: 'centrolenidae', cat: 'amphibians', kind: 'taxon', iucn: 'LC',
      sci: 'Centrolenidae',
      name: L('Ranas de cristal', 'Glass Frogs'),
      taxonomy: { kingdom: 'Animalia', phylum: 'Chordata', class: 'Amphibia', order: 'Anura', family: 'Centrolenidae', genus: 'Hyalinobatrachium, Espadarana, Teratohyla, Sachatamia', species: 'H. valerioi, H. fleischmanni, E. prosoblepon, T. spinosa' },
      facts: [
        { k: L('Longitud típica', 'Typical length'), v: L('19 - 32 mm', '19 - 32 mm') },
        { k: L('Hábitat', 'Habitat'), v: L('Vegetación sobre quebradas', 'Vegetation over streams') },
        { k: L('Estado UICN', 'IUCN status'), v: L('Variable según especie', 'Varies by species') }
      ],
      desc: L(
        `Familia neotropical de anuros pequeños con dorso verde lima y piel ventral translúcida que deja ver corazón, hígado y tracto digestivo. Investigaciones recientes en Hyalinobatrachium fleischmanni demostraron que, durante el reposo, secuestran hasta el 90 por ciento de los eritrocitos en el hígado, aumentando su transparencia. Ojos con iris dorado o plateado orientados frontalmente.`,
        `Neotropical family of small anurans with lime-green dorsum and translucent ventral skin revealing heart, liver and gut. Recent research on Hyalinobatrachium fleischmanni showed that during rest they sequester up to 90 percent of red blood cells in the liver, increasing transparency. Eyes with gold or silver irises are directed forward.`
      ),
      diet: L(
        `Insectívoras nocturnas que consumen pequeños dípteros, polillas y otros artrópodos sobre la vegetación ribereña. Los renacuajos, alargados y de coloración rojiza, viven enterrados en sedimentos y hojarasca del fondo de la quebrada, alimentándose de detritos.`,
        `Nocturnal insectivores feeding on small flies, moths and other arthropods on riparian vegetation. Tadpoles, elongated and reddish, live buried in sediment and leaf packs on the stream bottom, feeding on detritus.`
      ),
      behavior: L(
        `Los machos cantan con notas agudas desde hojas sobre el agua y defienden territorios. En Hyalinobatrachium valerioi y H. fleischmanni el macho custodia las puestas durante días, hidratándolas y protegiéndolas de avispas y moscas parasitoides. Al eclosionar, los renacuajos caen directamente a la corriente. Búsquelas de noche en el envés de hojas que cuelgan sobre quebradas limpias.`,
        `Males call with high-pitched notes from leaves above water and defend territories. In Hyalinobatrachium valerioi and H. fleischmanni the male guards the clutches for days, hydrating them and protecting them from wasps and parasitoid flies. On hatching, tadpoles drop directly into the current. Search at night on the undersides of leaves overhanging clean streams.`
      ),
      role: L(
        `Bioindicadores de primer orden: su ciclo vital exige vegetación ribereña intacta, agua limpia, oxigenada y de temperatura estable. Son sensibles a la sedimentación, a los agroquímicos y a la quitridiomicosis (Batrachochytrium dendrobatidis). Su presencia sostenida en una quebrada es evidencia de integridad ecológica del sistema ribereño.`,
        `First-order bioindicators: their life cycle requires intact riparian vegetation and clean, oxygenated, thermally stable water. They are sensitive to sedimentation, agrochemicals and chytridiomycosis (Batrachochytrium dendrobatidis). Their sustained presence in a stream is evidence of ecological integrity of the riparian system.`
      )
    },

    /* ===================== REPTILES ===================== */
    {
      id: 'iguana-iguana', cat: 'reptiles', kind: 'taxon', iucn: 'LC',
      sci: 'Iguana iguana',
      name: L('Iguana verde', 'Green Iguana'),
      taxonomy: { kingdom: 'Animalia', phylum: 'Chordata', class: 'Reptilia', order: 'Squamata', family: 'Iguanidae', genus: 'Iguana', species: 'I. iguana' },
      facts: [
        { k: L('Longitud total', 'Total length'), v: L('Hasta 1.8 m', 'Up to 1.8 m') },
        { k: L('Apéndice CITES', 'CITES Appendix'), v: L('II', 'II') },
        { k: L('Anidación', 'Nesting'), v: L('Febrero - abril, playas arenosas de río', 'February - April, sandy river beaches') }
      ],
      desc: L(
        `Saurio herbívoro de gran tamaño con cresta dorsal de escamas espinosas, papada (gular) y una escama subtimpánica circular prominente. Posee ojo parietal fotosensible en la parte superior de la cabeza, que detecta cambios de luz y sombras de depredadores aéreos. Los machos adultos en época reproductiva adquieren tonos anaranjados.`,
        `Large herbivorous lizard with a dorsal crest of spiny scales, a dewlap and a prominent circular subtympanic scale. It has a photosensitive parietal eye on top of the head that detects light changes and shadows of aerial predators. Adult males turn orange during the breeding season.`
      ),
      diet: L(
        `Folívora en estado adulto: hojas, flores y frutos de numerosas especies ribereñas. La digestión depende de microbiota fermentativa en el colon, adquirida por los juveniles mediante la ingestión de heces de adultos. Los juveniles pueden consumir ocasionalmente insectos.`,
        `Folivorous as an adult: leaves, flowers and fruits of many riparian species. Digestion relies on fermentative microbiota in the colon, acquired by juveniles by ingesting adult feces. Juveniles may occasionally eat insects.`
      ),
      behavior: L(
        `Heliotérmica: se asolea en ramas altas sobre el río durante la mañana. Ante amenaza se deja caer al agua y nada con ondulaciones de la cola, pudiendo permanecer sumergida varios minutos. Los machos son territoriales y realizan despliegues de cabeceo y extensión de la papada. Las hembras excavan nidos comunales en bancos arenosos.`,
        `Heliothermic: it basks on high branches above the river in the morning. When threatened it drops into the water and swims with tail undulations, able to remain submerged for several minutes. Males are territorial and perform head-bobbing and dewlap displays. Females dig communal nests in sandy banks.`
      ),
      role: L(
        `Herbívoro clave del dosel ribereño y dispersor de semillas; sus huevos y juveniles son presa de aves rapaces, serpientes, caimanes y mamíferos. Históricamente sometida a cacería para consumo; su manejo en zoocriaderos es una herramienta de conservación en Costa Rica.`,
        `Key herbivore of the riparian canopy and seed disperser; its eggs and juveniles are prey to raptors, snakes, caimans and mammals. Historically hunted for food; its management in breeding farms is a conservation tool in Costa Rica.`
      )
    },
    {
      id: 'caiman-crocodilus', cat: 'reptiles', kind: 'taxon', iucn: 'LC',
      sci: 'Caiman crocodilus',
      name: L('Caimán de anteojos (babilla)', 'Spectacled Caiman'),
      taxonomy: { kingdom: 'Animalia', phylum: 'Chordata', class: 'Reptilia', order: 'Crocodylia', family: 'Alligatoridae', genus: 'Caiman', species: 'C. crocodilus' },
      facts: [
        { k: L('Longitud adulta', 'Adult length'), v: L('1.2 - 2.5 m', '1.2 - 2.5 m') },
        { k: L('Determinación sexual', 'Sex determination'), v: L('Dependiente de temperatura', 'Temperature-dependent') },
        { k: L('Apéndice CITES', 'CITES Appendix'), v: L('II', 'II') }
      ],
      desc: L(
        `Cocodrílido de tamaño mediano, coloración oliva a pardo amarillenta con bandas oscuras, reconocible por la cresta ósea transversal entre los ojos que asemeja el puente de unos anteojos. Hocico relativamente ancho. Ojos, narinas y oídos dispuestos en un mismo plano dorsal permiten respirar y vigilar con el cuerpo sumergido.`,
        `Medium-sized crocodilian, olive to yellowish-brown with dark bands, recognizable by the transverse bony ridge between the eyes resembling the bridge of spectacles. Relatively broad snout. Eyes, nostrils and ears aligned on the same dorsal plane allow breathing and surveillance while submerged.`
      ),
      diet: L(
        `Carnívoro oportunista con cambio ontogenético de dieta: los juveniles consumen insectos acuáticos, crustáceos y caracoles; los adultos, peces, anfibios, aves acuáticas y pequeños mamíferos. Su consumo de peces depredadores puede regular indirectamente las comunidades ícticas.`,
        `Opportunistic carnivore with an ontogenetic diet shift: juveniles eat aquatic insects, crustaceans and snails; adults take fish, amphibians, waterbirds and small mammals. Its predation on predatory fish can indirectly regulate fish communities.`
      ),
      behavior: L(
        `Prefiere aguas lentas: pozas profundas, remansos, lagunas y canales. De día se asolea en orillas; es más activo al anochecer. La hembra construye un nido de vegetación en descomposición cuyo calor incuba los huevos, y la temperatura determina el sexo de las crías. Ambos padres pueden vocalizar y defender a los neonatos. Por la noche, sus ojos reflejan un brillo rojizo a la linterna.`,
        `It prefers slow water: deep pools, backwaters, lagoons and channels. It basks on banks by day and is most active at dusk. The female builds a mound of decaying vegetation whose heat incubates the eggs, and temperature determines hatchling sex. Both parents may vocalize and defend neonates. At night its eyes reflect a reddish shine under a flashlight.`
      ),
      role: L(
        `Depredador tope en sistemas acuáticos de baja corriente; reciclador de carroña. Su abundancia lo convirtió en objeto de comercio de pieles tras el declive de especies mayores. Mantenga distancia en vados y pozas profundas; no es agresivo, pero puede defender nidos.`,
        `Top predator in low-current aquatic systems; carrion recycler. Its abundance made it a target of the skin trade after the decline of larger species. Keep a distance at fords and deep pools; it is not aggressive but may defend nests.`
      )
    },
    {
      id: 'bothrops-asper', cat: 'reptiles', kind: 'taxon', iucn: 'LC',
      sci: 'Bothrops asper',
      name: L('Terciopelo', 'Fer-de-lance (Terciopelo)'),
      taxonomy: { kingdom: 'Animalia', phylum: 'Chordata', class: 'Reptilia', order: 'Squamata', family: 'Viperidae', genus: 'Bothrops', species: 'B. asper' },
      facts: [
        { k: L('Longitud', 'Length'), v: L('1.2 - 2.0 m (excepcionalmente mayor)', '1.2 - 2.0 m (exceptionally larger)') },
        { k: L('Veneno', 'Venom'), v: L('Hemotóxico, proteolítico, mionecrótico', 'Hemotoxic, proteolytic, myonecrotic') },
        { k: L('Reproducción', 'Reproduction'), v: L('Vivípara, camadas numerosas', 'Viviparous, large litters') }
      ],
      desc: L(
        `Vipérido crotalino con cabeza triangular claramente diferenciada del cuello, foseta loreal termorreceptora entre el ojo y la narina, y patrón dorsal de triángulos oscuros con bordes claros sobre fondo pardo oliva. Es la serpiente responsable de la mayoría de los accidentes ofídicos graves en Costa Rica. Las hembras son considerablemente mayores que los machos.`,
        `Crotaline viper with a triangular head clearly distinct from the neck, a heat-sensing loreal pit between eye and nostril, and a dorsal pattern of dark, pale-edged triangles over olive-brown. It is responsible for most severe snakebites in Costa Rica. Females are considerably larger than males.`
      ),
      diet: L(
        `Generalista con cambio ontogenético: los neonatos usan la punta clara de la cola como señuelo caudal para atraer ranas y lagartijas; los adultos depredan principalmente roedores, marsupiales, aves y anfibios.`,
        `Generalist with an ontogenetic shift: neonates use their pale tail tip as a caudal lure to attract frogs and lizards; adults prey mainly on rodents, marsupials, birds and amphibians.`
      ),
      behavior: L(
        `Principalmente nocturna y terrestre; durante el día reposa enroscada entre hojarasca, raíces tabulares o bordes de potrero, en especial cerca de cuerpos de agua. Es frecuente en áreas alteradas con abundancia de roedores. A caballo, permita que el animal elija el paso en senderos con vegetación densa y evite desmontar en hojarasca sin revisar el suelo. En caso de mordedura: inmovilizar, no cortar ni succionar, y trasladar de inmediato a un centro de salud.`,
        `Mainly nocturnal and terrestrial; by day it rests coiled in leaf litter, among buttress roots or along pasture edges, especially near water. It is common in disturbed areas with abundant rodents. On horseback, let the horse choose its footing on densely vegetated trails and avoid dismounting into leaf litter without checking the ground. In case of a bite: immobilize, do not cut or suck, and transfer immediately to a health center.`
      ),
      role: L(
        `Depredador clave en el control de roedores en paisajes agropecuarios. Su veneno es base de investigación biomédica en el Instituto Clodomiro Picado (UCR), que produce el suero antiofídico polivalente utilizado en Centroamérica. Los caballos también son vulnerables a sus mordeduras.`,
        `Key predator in rodent control in agricultural landscapes. Its venom underpins biomedical research at the Clodomiro Picado Institute (University of Costa Rica), which produces the polyvalent antivenom used across Central America. Horses are also vulnerable to its bites.`
      )
    },
    {
      id: 'boa-imperator', cat: 'reptiles', kind: 'taxon', iucn: 'LC',
      sci: 'Boa imperator',
      name: L('Boa centroamericana (béquer)', 'Central American Boa'),
      taxonomy: { kingdom: 'Animalia', phylum: 'Chordata', class: 'Reptilia', order: 'Squamata', family: 'Boidae', genus: 'Boa', species: 'B. imperator' },
      facts: [
        { k: L('Longitud', 'Length'), v: L('1.5 - 3.0 m', '1.5 - 3.0 m') },
        { k: L('Veneno', 'Venom'), v: L('No venenosa (constrictora)', 'Non-venomous (constrictor)') },
        { k: L('Apéndice CITES', 'CITES Appendix'), v: L('II', 'II') }
      ],
      desc: L(
        `Boido robusto con patrón de sillas dorsales pardas oscuras sobre fondo beige a pardo, que se tornan rojizas hacia la cola. Separada taxonómicamente de Boa constrictor sudamericana con base en evidencia molecular. Conserva vestigios pélvicos visibles como espolones cloacales, más desarrollados en los machos.`,
        `Robust boid with dark brown dorsal saddles over a beige to brown background, turning reddish toward the tail. Taxonomically separated from South American Boa constrictor based on molecular evidence. It retains pelvic vestiges visible as cloacal spurs, more developed in males.`
      ),
      diet: L(
        `Depredador por emboscada que mata por constricción, interrumpiendo la circulación sanguínea de la presa. Consume roedores, zarigüeyas, murciélagos, aves e iguanas. Tras una ingesta grande puede ayunar varias semanas.`,
        `Ambush predator that kills by constriction, interrupting the prey's blood circulation. It eats rodents, opossums, bats, birds and iguanas. After a large meal it may fast for several weeks.`
      ),
      behavior: L(
        `Terrestre y semiarborícola, activa al crepúsculo y de noche. Puede encontrarse en árboles huecos, madrigueras y construcciones rurales. Al ser molestada sisea fuertemente y puede morder, aunque generalmente es tranquila. Vivípara, con camadas de 10 a 60 crías.`,
        `Terrestrial and semi-arboreal, active at dusk and at night. It may be found in hollow trees, burrows and rural buildings. When disturbed it hisses loudly and may bite, though it is generally calm. Viviparous, with litters of 10 to 60 young.`
      ),
      role: L(
        `Regulador natural de poblaciones de roedores y murciélagos en fincas, lo que la hace aliada de la producción agropecuaria. Sufre mortalidad por confusión con especies venenosas y por comercio de mascotas. Diferenciación de campo frente a Bothrops: cuerpo más grueso, ausencia de foseta loreal, cabeza con escamas pequeñas y patrón de sillas dorsales en lugar de triángulos.`,
        `Natural regulator of rodent and bat populations on farms, making it an ally of agricultural production. It suffers mortality from confusion with venomous species and from the pet trade. Field distinction from Bothrops: heavier body, no loreal pit, small head scales and a pattern of dorsal saddles rather than triangles.`
      )
    },

    /* ===================== INSECTOS ===================== */
    {
      id: 'morpho-peleides', cat: 'insects', kind: 'taxon', iucn: 'NE',
      sci: 'Morpho peleides',
      name: L('Mariposa morfo', 'Common Morpho'),
      taxonomy: { kingdom: 'Animalia', phylum: 'Arthropoda', class: 'Insecta', order: 'Lepidoptera', family: 'Nymphalidae', genus: 'Morpho', species: 'M. peleides' },
      facts: [
        { k: L('Envergadura', 'Wingspan'), v: L('95 - 120 mm', '95 - 120 mm') },
        { k: L('Subfamilia', 'Subfamily'), v: L('Morphinae', 'Morphinae') },
        { k: L('Plantas hospederas', 'Host plants'), v: L('Fabaceae (Machaerium, Mucuna, Dalbergia)', 'Fabaceae (Machaerium, Mucuna, Dalbergia)') }
      ],
      desc: L(
        `Ninfálido de gran tamaño cuya cara dorsal presenta un azul metálico iridiscente producido no por pigmentos sino por color estructural: nanoestructuras lamelares en las escamas generan interferencia constructiva de la luz. La cara ventral es parda con ocelos, críptica en reposo. El contraste al volar produce un efecto intermitente que dificulta su seguimiento por depredadores.`,
        `Large nymphalid whose dorsal surface shows an iridescent metallic hue produced not by pigment but by structural color: lamellar nanostructures on the scales cause constructive light interference. The ventral surface is brown with eyespots, cryptic at rest. The contrast in flight produces a flashing effect that hinders tracking by predators.`
      ),
      diet: L(
        `Las larvas se alimentan de follaje de leguminosas (Fabaceae) y presentan pelos urticantes como defensa. Los adultos no visitan flores: liban fermentos de frutos caídos, savia, hongos, carroña y excrementos, aprovechando sales y aminoácidos.`,
        `Larvae feed on legume foliage (Fabaceae) and bear urticating hairs for defense. Adults do not visit flowers: they imbibe fluids from fallen fermenting fruit, sap, fungi, carrion and dung, obtaining salts and amino acids.`
      ),
      behavior: L(
        `Vuelo errático y ondulante, con preferencia por corredores lineales: cauces, senderos y bordes de bosque, lo que la hace frecuente a lo largo del recorrido a caballo junto al río, especialmente en mañanas soleadas. Los machos patrullan rutas de vuelo en busca de hembras. En reposo pliega las alas, exponiendo solo la cara ventral.`,
        `Erratic, bouncing flight with preference for linear corridors: streams, trails and forest edges, making it frequent along the riverside horseback route, especially on sunny mornings. Males patrol flight routes in search of females. At rest it folds its wings, exposing only the ventral surface.`
      ),
      role: L(
        `Consumidor de frutos en descomposición y presa de jacamares y papamoscas. Sus nanoestructuras son modelo en biomimética (sensores, pigmentos sin tinte). Estado UICN no evaluado; su abundancia local depende de la conservación de bosque ribereño y plantas hospederas.`,
        `Consumer of decaying fruit and prey for jacamars and flycatchers. Its nanostructures are a model in biomimetics (sensors, dye-free pigments). IUCN status not evaluated; local abundance depends on conservation of riparian forest and host plants.`
      )
    },
    {
      id: 'atta-cephalotes', cat: 'insects', kind: 'taxon', iucn: 'NE',
      sci: 'Atta cephalotes',
      name: L('Zompopa (hormiga cortadora de hojas)', 'Leaf-cutter Ant'),
      taxonomy: { kingdom: 'Animalia', phylum: 'Arthropoda', class: 'Insecta', order: 'Hymenoptera', family: 'Formicidae', genus: 'Atta', species: 'A. cephalotes' },
      facts: [
        { k: L('Tribu', 'Tribe'), v: L('Attini (Myrmicinae)', 'Attini (Myrmicinae)') },
        { k: L('Tamaño de colonia', 'Colony size'), v: L('Varios millones de obreras', 'Several million workers') },
        { k: L('Hongo simbionte', 'Fungal symbiont'), v: L('Leucoagaricus gongylophorus', 'Leucoagaricus gongylophorus') }
      ],
      desc: L(
        `Hormiga con marcado polimorfismo de castas: mínimas que cuidan el jardín de hongos, forrajeras medianas que cortan y transportan fragmentos foliares, y soldados de cabeza grande con mandíbulas poderosas. Los nidos subterráneos pueden abarcar decenas de metros cuadrados y miles de cámaras, con sistemas de ventilación pasiva.`,
        `Ant with marked caste polymorphism: minims tending the fungus garden, medium foragers cutting and carrying leaf fragments, and large-headed soldiers with powerful mandibles. Underground nests can cover tens of square meters with thousands of chambers and passive ventilation systems.`
      ),
      diet: L(
        `No consume las hojas: las utiliza como sustrato para cultivar el hongo basidiomiceto Leucoagaricus gongylophorus, cuyas hifas producen gongilidios ricos en nutrientes que alimentan a la colonia. Bacterias actinomicetas (Pseudonocardia) sobre la cutícula producen antibióticos contra el hongo parásito Escovopsis: una simbiosis multipartita de unos 50 millones de años.`,
        `It does not eat the leaves: it uses them as substrate to farm the basidiomycete fungus Leucoagaricus gongylophorus, whose hyphae produce nutrient-rich gongylidia that feed the colony. Actinomycete bacteria (Pseudonocardia) on the cuticle produce antibiotics against the parasitic fungus Escovopsis: a multipartite symbiosis about 50 million years old.`
      ),
      behavior: L(
        `Forrajeo organizado en senderos troncales despejados marcados con feromonas, a menudo cruzando el camino; son visibles columnas de fragmentos verdes en movimiento. Obreras mínimas viajan sobre las hojas para defender a las cargadoras de moscas parásitas (Phoridae). Los vuelos nupciales ocurren con las primeras lluvias fuertes.`,
        `Foraging is organized along cleared trunk trails marked with pheromones, often crossing the road; columns of moving green fragments are visible. Minim workers ride on leaves to defend carriers against parasitic phorid flies. Nuptial flights take place with the first heavy rains.`
      ),
      role: L(
        `Uno de los herbívoros dominantes del Neotrópico. Ingenieras del ecosistema: airean el suelo, incorporan materia orgánica y concentran nutrientes en los basureros del nido, creando parches fértiles que favorecen la regeneración vegetal. Vínculo directo entre insectos y funga en la degradación de materia vegetal.`,
        `One of the dominant herbivores of the Neotropics. Ecosystem engineers: they aerate the soil, incorporate organic matter and concentrate nutrients in nest refuse dumps, creating fertile patches that favor plant regeneration. A direct link between insects and funga in plant matter degradation.`
      )
    },
    {
      id: 'bioluminescent-beetles', cat: 'insects', kind: 'taxon', iucn: 'NE',
      sci: 'Lampyridae / Pyrophorus spp.',
      name: L('Insectos bioluminiscentes: luciérnagas y cucuyos', 'Bioluminescent Insects: Fireflies and Click Beetles'),
      taxonomy: { kingdom: 'Animalia', phylum: 'Arthropoda', class: 'Insecta', order: 'Coleoptera', family: 'Lampyridae; Elateridae', genus: 'Photinus, Photuris, Pyrophorus', species: 'spp.' },
      facts: [
        { k: L('Reacción', 'Reaction'), v: L('Luciferina + luciferasa + ATP + O2 + Mg2+', 'Luciferin + luciferase + ATP + O2 + Mg2+') },
        { k: L('Eficiencia lumínica', 'Light efficiency'), v: L('Muy alta, mínima pérdida térmica', 'Very high, minimal heat loss') },
        { k: L('Horario de observación', 'Viewing time'), v: L('Crepúsculo y primeras horas de la noche', 'Dusk and early night') }
      ],
      desc: L(
        `Las luciérnagas (Lampyridae) poseen órganos lumínicos en los segmentos abdominales distales y emiten destellos intermitentes amarillo verdosos. Los cucuyos (Pyrophorus, Elateridae) emiten luz continua verde desde dos manchas en el protórax y luz anaranjada desde un órgano ventral abdominal visible en vuelo; además poseen el mecanismo de salto propio de los elatéridos.`,
        `Fireflies (Lampyridae) have light organs on the distal abdominal segments and emit intermittent yellow-green flashes. Click beetles (Pyrophorus, Elateridae) emit continuous green light from two prothoracic spots and orange light from a ventral abdominal organ visible in flight; they also have the jumping mechanism typical of elaterids.`
      ),
      diet: L(
        `Las larvas de luciérnaga son depredadoras de caracoles, babosas y lombrices, a las que inyectan secreciones digestivas. Muchos adultos se alimentan poco o nada. Las larvas de Pyrophorus son depredadoras en madera descompuesta y suelo. Las hembras de Photuris practican mimetismo agresivo: imitan los destellos de hembras de otras especies para capturar y devorar machos.`,
        `Firefly larvae prey on snails, slugs and earthworms, injecting digestive secretions. Many adults feed little or not at all. Pyrophorus larvae are predators in decaying wood and soil. Photuris females practice aggressive mimicry: they imitate the flash codes of other species' females to capture and eat males.`
      ),
      behavior: L(
        `Cada especie posee un código de destellos (duración, intervalo, altura de vuelo) que funciona como sistema de reconocimiento sexual. En noches húmedas de la estación lluviosa los potreros con bordes de bosque y las márgenes de quebradas muestran altas densidades. Para observarlos, apague luces artificiales y permita la adaptación ocular a la oscuridad.`,
        `Each species has a flash code (duration, interval, flight height) that serves as a sexual recognition system. On humid nights in the rainy season, pastures bordering forest and stream margins show high densities. To observe them, turn off artificial lights and allow your eyes to adapt to the dark.`
      ),
      role: L(
        `Depredadores de moluscos en el suelo y bioindicadores de calidad nocturna del hábitat. La contaminación lumínica interfiere con su comunicación y es causa documentada de declive, junto con plaguicidas y pérdida de hábitat húmedo. La luciferasa es una herramienta fundamental en biología molecular.`,
        `Soil mollusk predators and bioindicators of nocturnal habitat quality. Light pollution interferes with their communication and is a documented cause of decline, together with pesticides and loss of humid habitat. Luciferase is a fundamental tool in molecular biology.`
      )
    },
    {
      id: 'decomposer-insects', cat: 'insects', kind: 'taxon', iucn: 'NE',
      sci: 'Passalidae, Scarabaeinae, Termitidae',
      name: L('Insectos descomponedores y degradación de materia', 'Decomposer Insects and Matter Breakdown'),
      taxonomy: { kingdom: 'Animalia', phylum: 'Arthropoda', class: 'Insecta', order: 'Coleoptera; Blattodea', family: 'Passalidae; Scarabaeidae; Termitidae', genus: 'Passalus, Canthon, Phanaeus, Dichotomius, Nasutitermes', species: 'spp.' },
      facts: [
        { k: L('Recambio de hojarasca', 'Litter turnover'), v: L('Menos de un año', 'Less than one year') },
        { k: L('Procesos', 'Processes'), v: L('Fragmentación, enterramiento, digestión simbiótica', 'Fragmentation, burial, symbiotic digestion') }
      ],
      desc: L(
        `La degradación de materia orgánica en el bosque muy húmedo es extremadamente rápida y depende de un gremio de insectos. Los pasálidos (Passalus) son escarabajos subsociales que viven en troncos en descomposición; los escarabajos estercoleros (Scarabaeinae) procesan excrementos y carroña; las termitas (Nasutitermes) construyen nidos arbóreos oscuros conectados por galerías cubiertas.`,
        `Organic matter breakdown in the wet forest is extremely fast and depends on a guild of insects. Passalids (Passalus) are subsocial beetles living in decaying logs; dung beetles (Scarabaeinae) process feces and carrion; termites (Nasutitermes) build dark arboreal nests connected by covered galleries.`
      ),
      diet: L(
        `Pasálidos y termitas son xilófagos que dependen de microbiota intestinal y de la acción previa de hongos para digerir celulosa y lignina. Los estercoleros consumen y entierran excrementos de mamíferos, como los de monos aulladores. Esta cadena convierte madera y excretas en biomasa microbiana, humus y nutrientes disponibles para las raíces.`,
        `Passalids and termites are xylophagous, relying on gut microbiota and prior fungal action to digest cellulose and lignin. Dung beetles eat and bury mammal feces, such as those of howler monkeys. This chain converts wood and excreta into microbial biomass, humus and nutrients available to roots.`
      ),
      behavior: L(
        `Los pasálidos adultos cuidan a las larvas y se comunican por estridulación audible al manipular el tronco. Los estercoleros se clasifican en rodadores (forman bolas), cavadores (entierran bajo la fuente) y residentes. Observe troncos caídos junto al sendero y excrementos frescos: la llegada de escarabajos es casi inmediata.`,
        `Adult passalids care for larvae and communicate by audible stridulation when the log is handled. Dung beetles are classified as rollers (forming balls), tunnelers (burying beneath the source) and dwellers. Inspect fallen logs beside the trail and fresh dung: beetle arrival is almost immediate.`
      ),
      role: L(
        `Responsables del cierre de los ciclos de carbono y nutrientes, aireación del suelo, control de parásitos del ganado y dispersión secundaria de semillas. Los Scarabaeinae se emplean como grupo indicador estandarizado de alteración del bosque, pues su diversidad disminuye con la pérdida de mamíferos y de cobertura.`,
        `Responsible for closing carbon and nutrient cycles, soil aeration, control of livestock parasites and secondary seed dispersal. Scarabaeinae are used as a standardized indicator group of forest disturbance, since their diversity declines with the loss of mammals and cover.`
      )
    },

    /* ===================== FLORA ===================== */
    {
      id: 'ficus-aurea', cat: 'flora', kind: 'taxon', iucn: 'LC',
      sci: 'Ficus aurea',
      name: L('Higuerón estrangulador', 'Strangler Fig'),
      taxonomy: { kingdom: 'Plantae', phylum: 'Tracheophyta', class: 'Magnoliopsida', order: 'Rosales', family: 'Moraceae', genus: 'Ficus', species: 'F. aurea' },
      facts: [
        { k: L('Hábito', 'Habit'), v: L('Hemiepífita estranguladora', 'Strangling hemiepiphyte') },
        { k: L('Polinizador', 'Pollinator'), v: L('Avispas Agaonidae (Pegoscapus spp.)', 'Agaonid wasps (Pegoscapus spp.)') },
        { k: L('Altura', 'Height'), v: L('Hasta 30 m', 'Up to 30 m') }
      ],
      desc: L(
        `Árbol de látex blanco con hojas coriáceas elípticas y estípulas que dejan cicatrices anulares. Germina sobre las ramas de un árbol hospedero a partir de semillas depositadas por aves y murciélagos. Inicialmente epífita, emite raíces aéreas que descienden al suelo, se engrosan y anastomosan formando una red que rodea el tronco hospedero.`,
        `Tree with white latex, leathery elliptic leaves and stipules leaving annular scars. It germinates on the branches of a host tree from seeds deposited by birds and bats. Initially epiphytic, it sends aerial roots down to the soil that thicken and anastomose into a lattice enclosing the host trunk.`
      ),
      diet: L(
        `En la fase epífita obtiene agua y nutrientes de la materia orgánica acumulada en las axilas del hospedero. Al alcanzar el suelo, las raíces compiten por agua y nutrientes, mientras la copa compite por luz. La presión del enrejado radicular limita el crecimiento secundario del hospedero, que puede morir y descomponerse, dejando un tronco hueco.`,
        `In the epiphytic phase it obtains water and nutrients from organic matter accumulated in host crotches. Once rooted in the soil, its roots compete for water and nutrients while its crown competes for light. Pressure from the root lattice limits host secondary growth; the host may die and decay, leaving a hollow trunk.`
      ),
      behavior: L(
        `La inflorescencia es un sicono cerrado. Cada especie de Ficus depende de avispas agaónidas específicas que entran por el ostiolo, polinizan y ovipositan en las flores: un mutualismo obligado coevolutivo. La fructificación es asincrónica entre individuos, de modo que siempre hay higos disponibles en el paisaje.`,
        `The inflorescence is a closed syconium. Each Ficus species depends on specific agaonid wasps that enter through the ostiole, pollinate and lay eggs in the flowers: an obligate coevolved mutualism. Fruiting is asynchronous among individuals, so figs are always available somewhere in the landscape.`
      ),
      role: L(
        `Especie clave: sus frutos sostienen monos, murciélagos, tucanes, pavas y numerosos frugívoros en épocas de escasez. Los troncos huecos sirven de refugio a murciélagos y mamíferos. Adaptación central: la estrategia hemiepífita permite acceder a la luz del dosel sin pasar por la fase de plántula en el sotobosque oscuro.`,
        `Keystone species: its fruits sustain monkeys, bats, toucans, guans and many frugivores during periods of scarcity. Hollow trunks shelter bats and mammals. Core adaptation: the hemiepiphytic strategy allows access to canopy light without passing through the seedling stage in the dark understory.`
      )
    },
    {
      id: 'ceiba-pentandra', cat: 'flora', kind: 'taxon', iucn: 'LC',
      sci: 'Ceiba pentandra',
      name: L('Ceiba', 'Kapok Tree (Ceiba)'),
      taxonomy: { kingdom: 'Plantae', phylum: 'Tracheophyta', class: 'Magnoliopsida', order: 'Malvales', family: 'Malvaceae (Bombacoideae)', genus: 'Ceiba', species: 'C. pentandra' },
      facts: [
        { k: L('Altura', 'Height'), v: L('40 - 60 m (emergente)', '40 - 60 m (emergent)') },
        { k: L('Polinización', 'Pollination'), v: L('Quiropterofilia (murciélagos)', 'Chiropterophily (bats)') },
        { k: L('Dispersión', 'Dispersal'), v: L('Anemocoria (fibras de kapok)', 'Anemochory (kapok fibers)') }
      ],
      desc: L(
        `Árbol emergente de tronco recto y cilíndrico, con grandes gambas o raíces tablares y corteza gris verdosa, espinosa en individuos jóvenes. Hojas palmaticompuestas de 5 a 9 folíolos. Su copa amplia y estratificada sobresale del dosel y soporta una carga considerable de epífitas y lianas.`,
        `Emergent tree with a straight cylindrical trunk, large buttress roots and greenish bark, spiny in young individuals. Palmately compound leaves with 5 to 9 leaflets. Its broad, layered crown rises above the canopy and supports a considerable load of epiphytes and lianas.`
      ),
      diet: L(
        `Especie heliófila de crecimiento rápido. La corteza verde contiene clorofila y realiza fotosíntesis cuando el árbol está defoliado. Las gambas aumentan la estabilidad mecánica en suelos superficiales saturados y amplían el área de exploración radicular superficial donde se concentran los nutrientes.`,
        `Fast-growing light-demanding species. The green bark contains chlorophyll and photosynthesizes when the tree is leafless. Buttresses increase mechanical stability on shallow saturated soils and expand the superficial root exploration area where nutrients are concentrated.`
      ),
      behavior: L(
        `Florece mientras está sin hojas, lo que facilita el acceso de murciélagos nectarívoros (Glossophaginae, Phyllostomus) a flores blanquecinas que abren de noche con olor intenso. Los frutos capsulares liberan semillas envueltas en fibras sedosas (kapok) dispersadas por el viento. No florece todos los años.`,
        `It flowers while leafless, easing access for nectar bats (Glossophaginae, Phyllostomus) to whitish flowers that open at night with a strong scent. Capsular fruits release seeds wrapped in silky fibers (kapok) dispersed by wind. It does not flower every year.`
      ),
      role: L(
        `Hábitat estructural para comunidades enteras de epífitas, artrópodos, aves de nidificación en cavidades y águilas. Árbol sagrado en la cosmovisión mesoamericana. Adaptaciones destacadas: gambas, corteza fotosintética, defoliación facultativa y floración nocturna sincronizada con polinizadores voladores.`,
        `Structural habitat for entire communities of epiphytes, arthropods, cavity-nesting birds and eagles. A sacred tree in Mesoamerican cosmology. Notable adaptations: buttresses, photosynthetic bark, facultative leaf drop and nocturnal flowering synchronized with flying pollinators.`
      )
    },
    {
      id: 'epiphytes', cat: 'flora', kind: 'taxon', iucn: 'NE',
      sci: 'Bromeliaceae / Orchidaceae',
      name: L('Epífitas: bromelias y orquídeas', 'Epiphytes: Bromeliads and Orchids'),
      taxonomy: { kingdom: 'Plantae', phylum: 'Tracheophyta', class: 'Liliopsida', order: 'Poales; Asparagales', family: 'Bromeliaceae; Orchidaceae', genus: 'Guzmania, Werauhia, Aechmea; Maxillaria, Epidendrum, Sobralia', species: 'spp.' },
      facts: [
        { k: L('Orquídeas en Costa Rica', 'Orchids in Costa Rica'), v: L('Aproximadamente 1500 especies', 'Approximately 1500 species') },
        { k: L('Metabolismo', 'Metabolism'), v: L('C3 y CAM según especie', 'C3 and CAM depending on species') }
      ],
      desc: L(
        `Las epífitas crecen sobre otras plantas sin parasitarlas. Las bromelias de tanque forman rosetas cuyas bases foliares imbricadas acumulan agua y detritos (fitotelmata). Las orquídeas epífitas presentan pseudobulbos de almacenamiento y raíces aéreas cubiertas por velamen, un tejido esponjoso de células muertas que absorbe agua rápidamente.`,
        `Epiphytes grow on other plants without parasitizing them. Tank bromeliads form rosettes whose overlapping leaf bases accumulate water and detritus (phytotelmata). Epiphytic orchids have storage pseudobulbs and aerial roots covered with velamen, a spongy tissue of dead cells that rapidly absorbs water.`
      ),
      diet: L(
        `Sin acceso al suelo, obtienen nutrientes de la lluvia, la niebla y la materia orgánica atrapada. Las bromelias absorben agua y minerales mediante tricomas foliares peltados. Muchas especies expuestas utilizan metabolismo CAM, abriendo estomas de noche para reducir la pérdida de agua. Las semillas de orquídeas, diminutas y sin endospermo, requieren hongos micorrícicos para germinar.`,
        `Without access to soil, they obtain nutrients from rain, mist and trapped organic matter. Bromeliads absorb water and minerals through peltate foliar trichomes. Many exposed species use CAM metabolism, opening stomata at night to reduce water loss. Orchid seeds, minute and lacking endosperm, require mycorrhizal fungi to germinate.`
      ),
      behavior: L(
        `Se distribuyen según gradientes verticales de luz y humedad: especies tolerantes a la sombra en troncos bajos y especies heliófilas en ramas expuestas del dosel. Las orquídeas presentan polinización altamente especializada, incluido el engaño sexual o alimentario y la recompensa de fragancias a abejas euglosinas. Use binoculares para examinar las ramas de ceibas e higuerones.`,
        `They are distributed along vertical light and humidity gradients: shade-tolerant species on lower trunks and light-demanding species on exposed canopy branches. Orchids show highly specialized pollination, including sexual or food deception and fragrance rewards to euglossine bees. Use binoculars to inspect branches of ceibas and figs.`
      ),
      role: L(
        `Los tanques de bromelias son microecosistemas que albergan larvas de insectos, arañas, cangrejos y renacuajos de ranas venenosas como Oophaga pumilio en las tierras bajas de la Zona Norte. Las epífitas interceptan niebla y lluvia, aumentando la retención hídrica del bosque. Su extracción para comercio está regulada.`,
        `Bromeliad tanks are microecosystems hosting insect larvae, spiders, crabs and tadpoles of poison frogs such as Oophaga pumilio in the Northern Zone lowlands. Epiphytes intercept mist and rain, increasing forest water retention. Their extraction for trade is regulated.`
      )
    },
    {
      id: 'heliconia', cat: 'flora', kind: 'taxon', iucn: 'NE',
      sci: 'Heliconia spp.',
      name: L('Heliconias (platanillas)', 'Heliconias (Lobster-claws)'),
      taxonomy: { kingdom: 'Plantae', phylum: 'Tracheophyta', class: 'Liliopsida', order: 'Zingiberales', family: 'Heliconiaceae', genus: 'Heliconia', species: 'H. latispatha, H. wagneriana, H. imbricata, H. irrasa' },
      facts: [
        { k: L('Hábito', 'Habit'), v: L('Hierba gigante rizomatosa', 'Giant rhizomatous herb') },
        { k: L('Polinizadores', 'Pollinators'), v: L('Colibríes ermitaños (Phaethornis, Glaucis)', 'Hermit hummingbirds (Phaethornis, Glaucis)') }
      ],
      desc: L(
        `Hierbas de gran porte con hojas similares a las del banano y vistosas inflorescencias erectas o colgantes formadas por brácteas coloridas (rojas, anaranjadas, amarillas) que protegen pequeñas flores tubulares. Se reproducen vegetativamente por rizomas, formando colonias clonales en claros, bordes de camino y márgenes de río.`,
        `Large herbs with banana-like leaves and showy erect or pendent inflorescences of colorful bracts (red, orange, yellow) protecting small tubular flowers. They reproduce vegetatively by rhizomes, forming clonal colonies in gaps, roadsides and riverbanks.`
      ),
      diet: L(
        `Plantas heliófilas o de media sombra, pioneras en la colonización de claros. Las brácteas acumulan agua de lluvia que reduce el acceso de ladrones de néctar y herbívoros a las flores, y que alberga comunidades acuáticas de invertebrados (fitotelmata).`,
        `Light-demanding or semi-shade plants, pioneers in gap colonization. Bracts accumulate rainwater that limits access by nectar robbers and herbivores to the flowers, and that hosts aquatic invertebrate communities (phytotelmata).`
      ),
      behavior: L(
        `La curvatura de la corola coincide con la del pico de los colibríes ermitaños, que visitan las plantas siguiendo rutas fijas (forrajeo en línea o traplining). Los frutos, drupas azul violáceo, son dispersados por aves. Las hojas jóvenes enrolladas sirven de refugio a ranas e insectos; el murciélago blanco (Ectophylla alba) modifica las hojas en forma de tienda.`,
        `Corolla curvature matches the bill of hermit hummingbirds, which visit plants along fixed routes (traplining). The fruits, violet drupes, are bird-dispersed. Rolled young leaves shelter frogs and insects; the Honduran white bat (Ectophylla alba) modifies leaves into tents.`
      ),
      role: L(
        `Modelo de coevolución planta-polinizador y recurso nectarífero estable para colibríes. Adaptaciones: rizomas para colonización clonal rápida, brácteas acumuladoras de agua, néctar abundante y flores con morfología restrictiva que filtran a los visitantes. Excelente indicador de bordes y claros en regeneración.`,
        `A model of plant-pollinator coevolution and a stable nectar resource for hummingbirds. Adaptations: rhizomes for rapid clonal colonization, water-holding bracts, abundant nectar and flowers with restrictive morphology that filter visitors. An excellent indicator of regenerating edges and gaps.`
      )
    },

    /* ===================== FUNGA ===================== */
    {
      id: 'pycnoporus-sanguineus', cat: 'funga', kind: 'taxon', iucn: 'NE',
      sci: 'Trametes sanguinea (= Pycnoporus sanguineus)',
      name: L('Hongo yesquero rojo', 'Cinnabar Bracket'),
      taxonomy: { kingdom: 'Fungi', phylum: 'Basidiomycota', class: 'Agaricomycetes', order: 'Polyporales', family: 'Polyporaceae', genus: 'Trametes', species: 'T. sanguinea' },
      facts: [
        { k: L('Tipo de pudrición', 'Rot type'), v: L('Pudrición blanca', 'White rot') },
        { k: L('Pigmento', 'Pigment'), v: L('Cinabarina', 'Cinnabarin') },
        { k: L('Sustrato', 'Substrate'), v: L('Madera muerta expuesta al sol', 'Sun-exposed dead wood') }
      ],
      desc: L(
        `Basidiomiceto poliporoide de basidiomas semicirculares, delgados y coriáceos, de color rojo anaranjado intenso en ambas caras, con poros diminutos en la superficie inferior. Es uno de los hongos más conspicuos en ramas caídas, postes de cercas y troncos de potreros y bordes de camino.`,
        `Polyporoid basidiomycete with thin, leathery, semicircular fruiting bodies of intense orange-red color on both surfaces, with minute pores underneath. It is one of the most conspicuous fungi on fallen branches, fence posts and logs in pastures and along roadsides.`
      ),
      diet: L(
        `Saprótrofo lignícola causante de pudrición blanca: secreta enzimas oxidativas (lacasas, peroxidasas) capaces de despolimerizar la lignina, el polímero vegetal más recalcitrante, dejando la celulosa de aspecto blanquecino y fibroso. Sus lacasas tienen aplicaciones en biorremediación y decoloración de efluentes.`,
        `Lignicolous saprotroph causing white rot: it secretes oxidative enzymes (laccases, peroxidases) able to depolymerize lignin, the most recalcitrant plant polymer, leaving whitish, fibrous cellulose. Its laccases have applications in bioremediation and effluent decolorization.`
      ),
      behavior: L(
        `Tolera alta radiación y desecación, por lo que coloniza madera expuesta en sitios abiertos más que en el sotobosque sombreado. Los basidiomas persisten semanas a meses, liberando basidiosporas por los poros. El color se debe a la cinabarina, compuesto con actividad antimicrobiana.`,
        `It tolerates high radiation and desiccation, so it colonizes exposed wood in open sites rather than in the shaded understory. Fruiting bodies persist for weeks to months, releasing basidiospores through the pores. The color is due to cinnabarin, a compound with antimicrobial activity.`
      ),
      role: L(
        `Pionero en la descomposición de madera en ambientes abiertos y alterados; su presencia es indicadora de bordes y claros. Inicia la cadena de degradación que luego aprovechan insectos xilófagos como pasálidos y termitas.`,
        `Pioneer in wood decomposition in open and disturbed environments; its presence indicates edges and gaps. It initiates the decomposition chain later exploited by wood-feeding insects such as passalids and termites.`
      )
    },
    {
      id: 'ganoderma', cat: 'funga', kind: 'taxon', iucn: 'NE',
      sci: 'Ganoderma spp. (complejo G. australe / G. applanatum)',
      name: L('Ganoderma (oreja de palo)', 'Ganoderma (Artist\u2019s Conk)'),
      taxonomy: { kingdom: 'Fungi', phylum: 'Basidiomycota', class: 'Agaricomycetes', order: 'Polyporales', family: 'Polyporaceae (Ganodermataceae)', genus: 'Ganoderma', species: 'spp.' },
      facts: [
        { k: L('Longevidad del basidioma', 'Fruiting body lifespan'), v: L('Perenne, varios años', 'Perennial, several years') },
        { k: L('Esporada', 'Spore print'), v: L('Parda rojiza', 'Reddish brown') },
        { k: L('Trofismo', 'Trophic mode'), v: L('Saprótrofo y patógeno facultativo', 'Saprotroph and facultative pathogen') }
      ],
      desc: L(
        `Basidiomas leñosos, sésiles y perennes en forma de repisa, de superficie superior pardo opaca y zonada, con margen blanquecino de crecimiento activo y superficie poroide inferior blanca que se oscurece al rasparse. Se desarrollan en la base y en raíces de árboles vivos o muertos, añadiendo una capa de tubos cada temporada.`,
        `Woody, sessile, perennial shelf-like fruiting bodies with a dull, zoned brown upper surface, a whitish actively growing margin and a white pore surface underneath that darkens when scratched. They develop at the base and roots of living or dead trees, adding a new tube layer each season.`
      ),
      diet: L(
        `Degradador de pudrición blanca con alta capacidad ligninolítica. Puede actuar como patógeno de raíz y base del tronco en árboles debilitados, provocando pudrición del duramen y eventual caída, y continuar como saprótrofo tras la muerte del hospedero.`,
        `White-rot decomposer with high ligninolytic capacity. It can act as a root and butt-rot pathogen in weakened trees, causing heartwood decay and eventual treefall, and continue as a saprotroph after host death.`
      ),
      behavior: L(
        `Produce cantidades masivas de basidiosporas pardas que suelen cubrir la superficie superior del propio basidioma y el sustrato circundante. Algunos dípteros y coleópteros fungívoros completan su desarrollo dentro de los tubos. Busque repisas en la base de árboles grandes cercanos al sendero.`,
        `It releases massive amounts of brown basidiospores that often coat the upper surface of the fruiting body and surrounding substrate. Some fungivorous flies and beetles complete their development inside the tubes. Look for shelves at the base of large trees near the trail.`
      ),
      role: L(
        `Agente natural de la dinámica de claros: al debilitar árboles maduros acelera su caída, abriendo espacio a la regeneración. Además transforma grandes volúmenes de madera en materia orgánica humificada. Diversas especies del género tienen relevancia farmacológica.`,
        `Natural agent of gap dynamics: by weakening mature trees it accelerates treefall, opening space for regeneration. It also transforms large volumes of wood into humified organic matter. Several species in the genus have pharmacological relevance.`
      )
    },
    {
      id: 'mycelial-network', cat: 'funga', kind: 'taxon', iucn: 'NE',
      sci: 'Marasmius spp., Auricularia spp., Glomeromycota',
      name: L('Red micelial del sotobosque', 'Understory Mycelial Network'),
      taxonomy: { kingdom: 'Fungi', phylum: 'Basidiomycota; Glomeromycota', class: 'Agaricomycetes; Glomeromycetes', order: 'Agaricales; Auriculariales; Glomerales', family: 'Marasmiaceae; Auriculariaceae', genus: 'Marasmius, Auricularia', species: 'M. crinis-equi y otras' },
      facts: [
        { k: L('Estructuras clave', 'Key structures'), v: L('Hifas, rizomorfos, micorrizas arbusculares', 'Hyphae, rhizomorphs, arbuscular mycorrhizae') },
        { k: L('Asociación dominante', 'Dominant association'), v: L('Micorriza arbuscular', 'Arbuscular mycorrhiza') }
      ],
      desc: L(
        `Bajo la hojarasca se extiende una red continua de hifas. Destacan los rizomorfos negros y delgados de Marasmius crinis-equi (hongo crin de caballo), que forman redes aéreas entre arbustos capaces de interceptar hojas antes de que lleguen al suelo. Las orejas de palo (Auricularia), gelatinosas, y los pequeños Marasmius de sombrero acampanado son visibles tras las lluvias.`,
        `Beneath the litter extends a continuous network of hyphae. Notable are the thin black rhizomorphs of Marasmius crinis-equi (horsehair fungus), forming aerial nets among shrubs that intercept leaves before they reach the ground. Gelatinous wood ears (Auricularia) and small bell-capped Marasmius become visible after rains.`
      ),
      diet: L(
        `Los saprótrofos de hojarasca descomponen celulosa y lignina, liberando nitrógeno y fósforo. Paralelamente, la mayoría de los árboles del bosque tropical húmedo forman micorrizas arbusculares con Glomeromycota: el hongo explora el suelo pobre y transfiere fósforo y agua a la planta a cambio de carbohidratos. Este acoplamiento cierra el ciclo de nutrientes en la capa superficial.`,
        `Litter saprotrophs break down cellulose and lignin, releasing nitrogen and phosphorus. In parallel, most trees in the humid tropical forest form arbuscular mycorrhizae with Glomeromycota: the fungus explores the poor soil and transfers phosphorus and water to the plant in exchange for carbohydrates. This coupling closes the nutrient cycle in the topsoil.`
      ),
      behavior: L(
        `La fructificación responde a pulsos de humedad: tras lluvias intensas emergen numerosos basidiomas efímeros. Al apartar la hojarasca se observan micelios blancos y hojas unidas por hifas. En la estación lluviosa, algunos hongos del sotobosque, como ciertos Mycena, presentan bioluminiscencia tenue en madera en descomposición.`,
        `Fruiting responds to moisture pulses: after heavy rains numerous ephemeral fruiting bodies emerge. Moving aside the litter reveals white mycelia and leaves bound by hyphae. In the rainy season some understory fungi, such as certain Mycena, show faint bioluminescence on decaying wood.`
      ),
      role: L(
        `La red micelial sostiene la productividad del bosque sobre suelos pobres, estabiliza agregados del suelo, retiene nutrientes que de otro modo serían lixiviados por las lluvias y conecta los procesos de descomposición con la nutrición vegetal. Su alteración por compactación, quemas o agroquímicos ralentiza la regeneración.`,
        `The mycelial network sustains forest productivity on poor soils, stabilizes soil aggregates, retains nutrients that would otherwise be leached by rain, and links decomposition processes to plant nutrition. Its disruption by compaction, burning or agrochemicals slows regeneration.`
      )
    }
  ];

  window.GUIDE_DATA = { categories, entries };
})();
