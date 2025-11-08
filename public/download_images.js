import fs from "fs";
import path from "path";
import https from "https";
import http from "http";

// Product list with image URLs
const products = [
  {
    product_name: "AADAT (Patented Product)",
    image_url:
      "https://parijatagrochemicals.com/wp-content/uploads/2018/07/Aadat500-ML-520x520.png",
  },
  {
    product_name: "ABADDON",
    image_url:
      "https://parijatagrochemicals.com/wp-content/uploads/2024/01/Abaddon.jpg",
  },
  {
    product_name: "AC-116",
    image_url:
      "https://parijatagrochemicals.com/wp-content/uploads/2016/10/Ac116-2-520x520.png",
  },
  {
    product_name: "AHEAD",
    image_url:
      "https://parijatagrochemicals.com/wp-content/uploads/2025/08/Ahead.png",
  },
  {
    product_name: "AMBIVI",
    image_url:
      "https://parijatagrochemicals.com/wp-content/uploads/2021/06/AMBIVI-520x520.png",
  },
  {
    product_name: "APNAZEB M-45",
    image_url:
      "https://parijatagrochemicals.com/wp-content/uploads/2023/02/Apnazeb-520x520.png",
  },
  {
    product_name: "ARADO Q+",
    image_url:
      "https://parijatagrochemicals.com/wp-content/uploads/2023/07/Arado-Q-520x520.jpg",
  },
  {
    product_name: "AUDICIA",
    image_url:
      "https://parijatagrochemicals.com/wp-content/uploads/2024/09/AUDICIA.png",
  },
  {
    product_name: "BACE-50",
    image_url:
      "https://parijatagrochemicals.com/wp-content/uploads/2016/12/Bace-50_1Kg-520x520.png",
  },
  {
    product_name: "BRILLAR",
    image_url:
      "https://parijatagrochemicals.com/wp-content/uploads/2024/01/Brillar.jpg",
  },
  {
    product_name: "CARMI",
    image_url:
      "https://parijatagrochemicals.com/wp-content/uploads/2020/08/Carmi-520x520.png",
  },
  {
    product_name: "CORATO",
    image_url:
      "https://parijatagrochemicals.com/wp-content/uploads/2024/06/CORATO-NEW-PACK-1-scaled-520x520.png",
  },
  {
    product_name: "CREEPNIX",
    image_url:
      "https://parijatagrochemicals.com/wp-content/uploads/2024/07/Creepnix-.png",
  },
  {
    product_name: "CUTLASS",
    image_url:
      "https://parijatagrochemicals.com/wp-content/uploads/2023/04/Cutlass-520x520.jpg",
  },
  {
    product_name: "DAHAN",
    image_url:
      "https://parijatagrochemicals.com/wp-content/uploads/2023/04/Dahan-520x520.jpg",
  },
  {
    product_name: "DAIKO",
    image_url:
      "https://parijatagrochemicals.com/wp-content/uploads/2024/07/Daiko.png",
  },
  {
    product_name: "DAITA",
    image_url:
      "https://parijatagrochemicals.com/wp-content/uploads/2016/12/Daita-New-520x520.png",
  },
  {
    product_name: "DEMOLIT",
    image_url:
      "https://parijatagrochemicals.com/wp-content/uploads/2024/07/Demolit-.png",
  },
  {
    product_name: "DEVGADSTAR-23",
    image_url:
      "https://parijatagrochemicals.com/wp-content/uploads/2023/07/Devgadstar-520x520.jpg",
  },
  {
    product_name: "DHOL",
    image_url:
      "https://parijatagrochemicals.com/wp-content/uploads/2025/09/Dhol-520x520.png",
  },
  {
    product_name: "DIATRON",
    image_url:
      "https://parijatagrochemicals.com/wp-content/uploads/2016/12/diatron-520x520.png",
  },
  {
    product_name: "DOZAN",
    image_url:
      "https://parijatagrochemicals.com/wp-content/uploads/2019/10/Dozan_new-520x520.png",
  },
  {
    product_name: "EEYO PSP 500",
    image_url:
      "https://parijatagrochemicals.com/wp-content/uploads/2021/09/Eeyo-520x520.png",
  },
  {
    product_name: "ELONA",
    image_url:
      "https://parijatagrochemicals.com/wp-content/uploads/2020/08/Elona_NEW-520x520.png",
  },
  {
    product_name: "FIPTOR 80",
    image_url:
      "https://parijatagrochemicals.com/wp-content/uploads/2016/10/Fiptor-80_NEW-520x520.png",
  },
  {
    product_name: "FLYER",
    image_url:
      "https://parijatagrochemicals.com/wp-content/uploads/2024/01/Flyer.jpg",
  },
  {
    product_name: "FORMITE",
    image_url:
      "https://parijatagrochemicals.com/wp-content/uploads/2019/02/Formite-NEW-520x520.png",
  },
  {
    product_name: "FUKA",
    image_url:
      "https://parijatagrochemicals.com/wp-content/uploads/2016/10/FUKA-520x520.png",
  },
  {
    product_name: "GIBAC",
    image_url:
      "https://parijatagrochemicals.com/wp-content/uploads/2016/10/GIBAC-520x520.png",
  },
  {
    product_name: "GLYCLEAR",
    image_url:
      "https://parijatagrochemicals.com/wp-content/uploads/2025/09/Glyclear-520x520.png",
  },
  {
    product_name: "GRIMA",
    image_url:
      "https://parijatagrochemicals.com/wp-content/uploads/2024/07/Grima.png",
  },
  {
    product_name: "HAZZ-T",
    image_url:
      "https://parijatagrochemicals.com/wp-content/uploads/2021/10/Hazz-T-520x520.png",
  },
  {
    product_name: "HOP-MAAR",
    image_url:
      "https://parijatagrochemicals.com/wp-content/uploads/2020/08/HOP-MAAR-520x520.png",
  },
  {
    product_name: "IMAZE-SUPER",
    image_url:
      "https://parijatagrochemicals.com/wp-content/uploads/2016/12/IMAZE-SUPER_NEW-520x520.png",
  },
  {
    product_name: "IMPLICITE",
    image_url:
      "https://parijatagrochemicals.com/wp-content/uploads/2024/07/Implicite-.png",
  },
  {
    product_name: "INDAZOLE",
    image_url:
      "https://parijatagrochemicals.com/wp-content/uploads/2016/12/Indazole_NEW-520x520.png",
  },
  {
    product_name: "IS SURE",
    image_url:
      "https://parijatagrochemicals.com/wp-content/uploads/2019/10/Is-sure_New-520x520.png",
  },
  {
    product_name: "JIMITA",
    image_url:
      "https://parijatagrochemicals.com/wp-content/uploads/2016/10/Jimita2022.187-520x520.png",
  },
  {
    product_name: "JONGA",
    image_url:
      "https://parijatagrochemicals.com/wp-content/uploads/2016/10/jonga-520x520.png",
  },
  {
    product_name: "KANJO SP",
    image_url:
      "https://parijatagrochemicals.com/wp-content/uploads/2019/01/KANJO-SP-520x520.png",
  },
  {
    product_name: "KANJO",
    image_url:
      "https://parijatagrochemicals.com/wp-content/uploads/2017/05/KANJO-520x520.gif",
  },
  {
    product_name: "KAZIRO",
    image_url:
      "https://parijatagrochemicals.com/wp-content/uploads/2019/01/Kaziro_New-520x520.png",
  },
  {
    product_name: "KING CARB",
    image_url:
      "https://parijatagrochemicals.com/wp-content/uploads/2016/10/King-carb_new-520x520.png",
  },
  {
    product_name: "KIRIN",
    image_url:
      "https://parijatagrochemicals.com/wp-content/uploads/2017/05/KIRIN-520x520.gif",
  },
  {
    product_name: "KIZOMBA",
    image_url:
      "https://parijatagrochemicals.com/wp-content/uploads/2019/10/Kizomba_New-520x520.png",
  },
  {
    product_name: "LEONIS CO MAX",
    image_url:
      "https://parijatagrochemicals.com/wp-content/uploads/2024/06/Leonis-Co-Max.png",
  },
  {
    product_name: "LEONIS",
    image_url:
      "https://parijatagrochemicals.com/wp-content/uploads/2023/09/Leonis-1l-2-520x520.jpg",
  },
  {
    product_name: "LOCSLAY 5",
    image_url:
      "https://parijatagrochemicals.com/wp-content/uploads/2016/10/locslay-5-520x520.png",
  },
  {
    product_name: "LUKARIO",
    image_url:
      "https://parijatagrochemicals.com/wp-content/uploads/2025/07/Lukario-300Px-1.png",
  },
  {
    product_name: "MEDAD",
    image_url:
      "https://parijatagrochemicals.com/wp-content/uploads/2019/10/Medad_New-520x520.png",
  },
  {
    product_name: "METRIPIL",
    image_url:
      "https://parijatagrochemicals.com/wp-content/uploads/2017/05/METRIPIL-520x520.gif",
  },
  {
    product_name: "Mkel FUZICO-FS",
    image_url:
      "https://parijatagrochemicals.com/wp-content/uploads/2019/08/FUZICO-FS-520x520.png",
  },
  {
    product_name: "MOJATI",
    image_url:
      "https://parijatagrochemicals.com/wp-content/uploads/2017/10/Mojati_New-520x520.png",
  },
  {
    product_name: "MORTEL GR",
    image_url:
      "https://parijatagrochemicals.com/wp-content/uploads/2020/08/Motel-gr_New-520x520.png",
  },
  {
    product_name: "MORTEL PLUS",
    image_url:
      "https://parijatagrochemicals.com/wp-content/uploads/2020/08/Mortel-Plus_New-520x520.png",
  },
  {
    product_name: "MORTEL SC",
    image_url:
      "https://parijatagrochemicals.com/wp-content/uploads/2020/08/Motel-sc_New-520x520.png",
  },
  {
    product_name: "NAGARA SUPER",
    image_url:
      "https://parijatagrochemicals.com/wp-content/uploads/2017/09/NAGARA-SUPER-520x520.png",
  },
  {
    product_name: "NAGARA",
    image_url:
      "https://parijatagrochemicals.com/wp-content/uploads/2016/10/Nagara-520x520.png",
  },
  {
    product_name: "NAPOLEAN XTRA",
    image_url:
      "https://parijatagrochemicals.com/wp-content/uploads/2020/08/Nepoleon-xtra_New-520x520.png",
  },
  {
    product_name: "NAPOLEON",
    image_url:
      "https://parijatagrochemicals.com/wp-content/uploads/2017/09/NAPOLEON-520x520.png",
  },
  {
    product_name: "NISCHIT",
    image_url:
      "https://parijatagrochemicals.com/wp-content/uploads/2023/04/Nischit-520x520.jpg",
  },
  {
    product_name: "NORIKO T3",
    image_url:
      "https://parijatagrochemicals.com/wp-content/uploads/2025/09/Noriko-T3-520x520.png",
  },
  {
    product_name: "NOWKO",
    image_url:
      "https://parijatagrochemicals.com/wp-content/uploads/2021/06/Nowko_new-520x520.png",
  },
  {
    product_name: "ONTEEM",
    image_url:
      "https://parijatagrochemicals.com/wp-content/uploads/2020/08/Onteem-520x520.png",
  },
  {
    product_name: "ORIENTAL",
    image_url:
      "https://parijatagrochemicals.com/wp-content/uploads/2019/02/Oriental2-520x520.png",
  },
  {
    product_name: "ORTEKO FG",
    image_url:
      "https://parijatagrochemicals.com/wp-content/uploads/2020/08/Orteko-520x520.png",
  },
  {
    product_name: "OXYCLEAR",
    image_url:
      "https://parijatagrochemicals.com/wp-content/uploads/2019/02/Oxyclear_New-520x520.png",
  },
  {
    product_name: "PARAMINE",
    image_url:
      "https://parijatagrochemicals.com/wp-content/uploads/2016/10/Paramine-520x520.png",
  },
  {
    product_name: "PARI ROOT PLUS",
    image_url:
      "https://parijatagrochemicals.com/wp-content/uploads/2025/09/Root-Plus-520x520.png",
  },
  {
    product_name: "Paribact-K",
    image_url:
      "https://parijatagrochemicals.com/wp-content/uploads/2025/09/Paribact-k-520x520.png",
  },
  {
    product_name: "Paribloom-23",
    image_url:
      "https://parijatagrochemicals.com/wp-content/uploads/2023/07/Paribloom-520x520.jpg",
  },
  {
    product_name: "PARICLEAR",
    image_url:
      "https://parijatagrochemicals.com/wp-content/uploads/2016/12/pariclear.jpg",
  },
  {
    product_name: "PARIFLEX",
    image_url:
      "https://parijatagrochemicals.com/wp-content/uploads/2021/06/Pariflex_new-520x520.png",
  },
  {
    product_name: "PARIMAZE",
    image_url:
      "https://parijatagrochemicals.com/wp-content/uploads/2021/06/Parimaze_new-520x520.png",
  },
  {
    product_name: "PARIQUAT",
    image_url:
      "https://parijatagrochemicals.com/wp-content/uploads/2025/09/Pariquat-520x520.png",
  },
  {
    product_name: "PARISTAR",
    image_url:
      "https://parijatagrochemicals.com/wp-content/uploads/2016/10/PARISTAR-520x520.png",
  },
  {
    product_name: "PARIURVA",
    image_url:
      "https://parijatagrochemicals.com/wp-content/uploads/2021/09/Pariurva-520x520.png",
  },
  {
    product_name: "PARIZINE",
    image_url:
      "https://parijatagrochemicals.com/wp-content/uploads/2022/03/Parizine_New-520x520.png",
  },
  {
    product_name: "PARIZOX-T2",
    image_url:
      "https://parijatagrochemicals.com/wp-content/uploads/2025/09/Parizox-T2-520x520.png",
  },
  {
    product_name: "PARIZOX",
    image_url:
      "https://parijatagrochemicals.com/wp-content/uploads/2019/10/Parizox_nw-520x520.png",
  },
  {
    product_name: "PARSUL",
    image_url:
      "https://parijatagrochemicals.com/wp-content/uploads/2025/09/Parsul-520x520.png",
  },
  {
    product_name: "PEACK",
    image_url:
      "https://parijatagrochemicals.com/wp-content/uploads/2024/07/Peack-.png",
  },
  {
    product_name: "PERFORM",
    image_url:
      "https://parijatagrochemicals.com/wp-content/uploads/2016/10/Perform_new-520x520.png",
  },
  {
    product_name: "SUPRANIL",
    image_url:
      "https://parijatagrochemicals.com/wp-content/uploads/2016/10/supranil_New-520x520.png",
  },
  {
    product_name: "TABAH",
    image_url:
      "https://parijatagrochemicals.com/wp-content/uploads/2024/11/Tabah-300x300px-1.png",
  },
  {
    product_name: "TAKE 44",
    image_url:
      "https://parijatagrochemicals.com/wp-content/uploads/2016/10/Take_44_V003-520x520.png",
  },
  {
    product_name: "TANCHUM",
    image_url:
      "https://parijatagrochemicals.com/wp-content/uploads/2016/10/tanchum_New-520x520.png",
  },
  {
    product_name: "TASAR",
    image_url:
      "https://parijatagrochemicals.com/wp-content/uploads/2023/03/tasar-520x520.jpg",
  },
  {
    product_name: "TEGATA",
    image_url:
      "https://parijatagrochemicals.com/wp-content/uploads/2016/10/tegata_new-520x520.png",
  },
  {
    product_name: "TEMBINE",
    image_url:
      "https://parijatagrochemicals.com/wp-content/uploads/2024/07/Tembine.png",
  },
  {
    product_name: "THOR PLUS",
    image_url:
      "https://parijatagrochemicals.com/wp-content/uploads/2020/08/Thor-plus_New-520x520.png",
  },
  {
    product_name: "THOR",
    image_url:
      "https://parijatagrochemicals.com/wp-content/uploads/2017/09/THOR-520x520.png",
  },
  {
    product_name: "TUCKZILA",
    image_url:
      "https://parijatagrochemicals.com/wp-content/uploads/2024/01/Tuczila.jpg",
  },
  {
    product_name: "URUMI",
    image_url:
      "https://parijatagrochemicals.com/wp-content/uploads/2022/07/URUMI_BOTTLE_600-x-600-520x520.png",
  },
  {
    product_name: "VELEKTIN",
    image_url:
      "https://parijatagrochemicals.com/wp-content/uploads/2025/09/Velektin-520x520.png",
  },
  {
    product_name: "VOSTRIX",
    image_url:
      "https://parijatagrochemicals.com/wp-content/uploads/2025/07/Vostrix-300Px.png",
  },
  {
    product_name: "XYFEN ULTRA",
    image_url:
      "https://parijatagrochemicals.com/wp-content/uploads/2025/09/Xyfen-Ultra-520x520.png",
  },
  {
    product_name: "ZERMIA",
    image_url:
      "https://parijatagrochemicals.com/wp-content/uploads/2024/01/Zermia.jpg",
  },
  {
    product_name: "ZINCAM 395",
    image_url:
      "https://parijatagrochemicals.com/wp-content/uploads/2021/09/Zincam-520x520.png",
  },
  {
    product_name: "ZIRAAT",
    image_url:
      "https://parijatagrochemicals.com/wp-content/uploads/2024/01/Ziraat.jpg",
  },
  {
    product_name: "ZIRYAN",
    image_url:
      "https://parijatagrochemicals.com/wp-content/uploads/2020/08/ziryan_New-520x520.png",
  },
  {
    product_name: "ZORYA",
    image_url:
      "https://parijatagrochemicals.com/wp-content/uploads/2025/07/Zorya-300Px.png",
  },
  {
    product_name: "Abacin",
    image_url:
      "https://www.crystalcropprotection.com/images/cropProtection/160066896120200921.jpg",
  },
  {
    product_name: "Apex-50",
    image_url:
      "https://www.crystalcropprotection.com/images/cropProtection/160066912820200921.jpg",
  },
  {
    product_name: "Baaz",
    image_url:
      "https://www.crystalcropprotection.com/images/cropProtection/160066929420200921.jpg",
  },
  {
    product_name: "Billo",
    image_url:
      "https://www.crystalcropprotection.com/images/cropProtection/160066944720200921.jpg",
  },
  {
    product_name: "Dursban",
    image_url:
      "https://www.crystalcropprotection.com/images/cropProtection/165052930420220421.jpg",
  },
  {
    product_name: "Furadan",
    image_url:
      "https://www.crystalcropprotection.com/images/cropProtection/160067014120200921.jpg",
  },
  {
    product_name: "Judo Plus",
    image_url:
      "https://www.crystalcropprotection.com/images/cropProtection/160067056820200921.jpg",
  },
  {
    product_name: "Predator",
    image_url:
      "https://www.crystalcropprotection.com/images/cropProtection/160067411220200921.jpg",
  },
  {
    product_name: "Splendour",
    image_url:
      "https://www.crystalcropprotection.com/images/cropProtection/160067428020200921.jpg",
  },
  {
    product_name: "Voltax",
    image_url:
      "https://www.crystalcropprotection.com/images/cropProtection/167817450420230307.png",
  },
  {
    product_name: "Confidence 555",
    image_url:
      "https://www.crystalcropprotection.com/images/cropProtection/160068743820200921.jpg",
  },
  {
    product_name: "Eldrin",
    image_url:
      "https://www.crystalcropprotection.com/images/cropProtection/160068890620200921.jpg",
  },
  {
    product_name: "Extra Super",
    image_url:
      "https://www.crystalcropprotection.com/images/cropProtection/160068919520200921.jpg",
  },
  {
    product_name: "Furadan Ultra",
    image_url:
      "https://www.crystalcropprotection.com/images/cropProtection/160068939120200921.jpg",
  },
  {
    product_name: "Lara-909",
    image_url:
      "https://www.crystalcropprotection.com/images/cropProtection/160069038820200921.jpg",
  },
  {
    product_name: "Lunox",
    image_url:
      "https://www.crystalcropprotection.com/images/cropProtection/160069067620200921.jpg",
  },
  {
    product_name: "Missile",
    image_url:
      "https://www.crystalcropprotection.com/images/cropProtection/160069165420200921.jpg",
  },
  {
    product_name: "Mitolin",
    image_url:
      "https://www.crystalcropprotection.com/images/cropProtection/160069189920200921.jpg",
  },
  {
    product_name: "Neo Super",
    image_url:
      "https://www.crystalcropprotection.com/images/cropProtection/160069210320200921.jpg",
  },
  {
    product_name: "Nidan",
    image_url:
      "https://www.crystalcropprotection.com/images/cropProtection/160069241420200921.jpg",
  },
  {
    product_name: "Proclaim",
    image_url:
      "https://www.crystalcropprotection.com/images/cropProtection/160069269820200921.jpg",
  },
  {
    product_name: "Rapid",
    image_url:
      "https://www.crystalcropprotection.com/images/cropProtection/160069296820200921.jpg",
  },
  {
    product_name: "Record",
    image_url:
      "https://www.crystalcropprotection.com/images/cropProtection/160069308820200921.jpg",
  },
  {
    product_name: "Snapper",
    image_url:
      "https://www.crystalcropprotection.com/images/cropProtection/160069338420200921.jpg",
  },
  {
    product_name: "Tribune",
    image_url:
      "https://www.crystalcropprotection.com/images/cropProtection/160074907520200922.jpg",
  },
  {
    product_name: "Carlos",
    image_url:
      "https://www.crystalcropprotection.com/images/cropProtection/165052835220220421.jpg",
  },
  {
    product_name: "MANDATE",
    image_url:
      "https://www.crystalcropprotection.com/images/cropProtection/165052954720220421.jpg",
  },
  {
    product_name: "ACM-9",
    image_url:
      "https://www.crystalcropprotection.com/images/cropProtection/160025668920200916.jpg",
  },
  {
    product_name: "Allquit",
    image_url:
      "https://www.crystalcropprotection.com/images/cropProtection/160034641020200917.jpg",
  },
  {
    product_name: "Avtaar",
    image_url:
      "https://www.crystalcropprotection.com/images/cropProtection/160034670420200917.jpg",
  },
  {
    product_name: "BANGO",
    image_url:
      "https://www.crystalcropprotection.com/images/cropProtection/160034689320200917.jpg",
  },
  {
    product_name: "BENTILA",
    image_url:
      "https://www.crystalcropprotection.com/images/cropProtection/160034712520200917.jpg",
  },
  {
    product_name: "Clinton",
    image_url:
      "https://www.crystalcropprotection.com/images/cropProtection/160034741420200917.jpg",
  },
  {
    product_name: "Guard",
    image_url:
      "https://www.crystalcropprotection.com/images/cropProtection/160034759620200917.jpg",
  },
  {
    product_name: "Penoxa",
    image_url:
      "https://www.crystalcropprotection.com/images/cropProtection/160040788520200918.jpg",
  },
  {
    product_name: "Ronaldo",
    image_url:
      "https://www.crystalcropprotection.com/images/cropProtection/160040818420200918.jpg",
  },
  {
    product_name: "Shift",
    image_url:
      "https://www.crystalcropprotection.com/images/cropProtection/160040835020200918.jpg",
  },
  {
    product_name: "Srizone",
    image_url:
      "https://www.crystalcropprotection.com/images/cropProtection/160040883320200918.jpg",
  },
  {
    product_name: "Topper 77",
    image_url:
      "https://www.crystalcropprotection.com/images/cropProtection/160040910820200918.jpg",
  },
  {
    product_name: "Weedor",
    image_url:
      "https://www.crystalcropprotection.com/images/cropProtection/160040935520200918.jpg",
  },
  {
    product_name: "AMORA",
    image_url:
      "https://www.crystalcropprotection.com/images/cropProtection/165052794220220421.jpg",
  },
  {
    product_name: "TAMBOLA",
    image_url:
      "https://www.crystalcropprotection.com/images/cropProtection/165052972420220421.jpg",
  },
  {
    product_name: "CUTOUT-38",
    image_url:
      "https://www.crystalcropprotection.com/images/cropProtection/165157777720220503.jpg",
  },
  {
    product_name: "Hola",
    image_url:
      "https://www.crystalcropprotection.com/images/cropProtection/166176414420220829.jpg",
  },
  {
    product_name: "Izuka",
    image_url:
      "https://www.crystalcropprotection.com/images/cropProtection/166176692220220829.jpg",
  },
  {
    product_name: "Novelty Gold",
    image_url:
      "https://www.crystalcropprotection.com/images/cropProtection/166176925320220829.jpg",
  },
  {
    product_name: "Traam",
    image_url:
      "https://www.crystalcropprotection.com/images/cropProtection/166177019520220829.jpg",
  },
  {
    product_name: "AFFINITY FORCE",
    image_url:
      "https://www.crystalcropprotection.com/images/cropProtection/166184215020220830.jpg",
  },
  {
    product_name: "ARSA",
    image_url:
      "https://www.crystalcropprotection.com/images/cropProtection/166184298120220830.jpg",
  },
  {
    product_name: "AWSUM",
    image_url:
      "https://www.crystalcropprotection.com/images/cropProtection/166184367620220830.jpg",
  },
  {
    product_name: "CRACKER",
    image_url:
      "https://www.crystalcropprotection.com/images/cropProtection/166184402120220830.jpg",
  },
  {
    product_name: "RICEACT",
    image_url:
      "https://www.crystalcropprotection.com/images/cropProtection/174244932020250320.png",
  },
  {
    product_name: "Sunrice",
    image_url:
      "https://www.crystalcropprotection.com/images/cropProtection/174946746420250609.jpg",
  },
  {
    product_name: "Azotrix",
    image_url:
      "https://www.crystalcropprotection.com/images/cropProtection/160041765720200918.jpg",
  },
  {
    product_name: "Bavistin",
    image_url:
      "https://www.crystalcropprotection.com/images/cropProtection/160042173520200918.jpg",
  },
  {
    product_name: "Blue Copper",
    image_url:
      "https://www.crystalcropprotection.com/images/cropProtection/160042640220200918.jpg",
  },
  {
    product_name: "Kyoto",
    image_url:
      "https://www.crystalcropprotection.com/images/cropProtection/160042730820200918.jpg",
  },
  {
    product_name: "Pluton",
    image_url:
      "https://www.crystalcropprotection.com/images/cropProtection/165046042020220420.jpg",
  },
  {
    product_name: "Sulphin",
    image_url:
      "https://www.crystalcropprotection.com/images/cropProtection/160042809520200918.jpg",
  },
  {
    product_name: "Sure",
    image_url:
      "https://www.crystalcropprotection.com/images/cropProtection/160043041220200918.jpg",
  },
  {
    product_name: "Tilt",
    image_url:
      "https://www.crystalcropprotection.com/images/cropProtection/160043085220200918.jpg",
  },
  {
    product_name: "Treat Power",
    image_url:
      "https://www.crystalcropprotection.com/images/cropProtection/160043147220200918.jpg",
  },
  {
    product_name: "Cryonil",
    image_url:
      "https://www.crystalcropprotection.com/images/cropProtection/165157890120220503.jpg",
  },
  {
    product_name: "SENATE",
    image_url:
      "https://www.crystalcropprotection.com/images/cropProtection/165157953020220503.jpg",
  },
  {
    product_name: "Cyplon",
    image_url:
      "https://www.crystalcropprotection.com/images/cropProtection/166175598920220829.jpg",
  },
  {
    product_name: "Monceren",
    image_url:
      "https://www.crystalcropprotection.com/images/cropProtection/166175802920220829.jpg",
  },
  {
    product_name: "Mentor",
    image_url:
      "https://www.crystalcropprotection.com/images/cropProtection/168689559620230616.jpg",
  },
  {
    product_name: "Remix",
    image_url:
      "https://www.crystalcropprotection.com/images/cropProtection/160066494620200921.jpg",
  },
  {
    product_name: "Treat",
    image_url:
      "https://www.crystalcropprotection.com/images/cropProtection/160066524620200921.jpg",
  },
  {
    product_name: "THEO SUPER",
    image_url:
      "https://www.crystalcropprotection.com/images/cropProtection/160066550620200921.jpg",
  },
  {
    product_name: "Vaccinator",
    image_url:
      "https://www.crystalcropprotection.com/images/cropProtection/160066590320200921.jpg",
  },
  {
    product_name: "Crystorhiza",
    image_url:
      "https://www.crystalcropprotection.com/images/cropProtection/160051659120200919.jpg",
  },
  {
    product_name: "EP-50",
    image_url:
      "https://www.crystalcropprotection.com/images/cropProtection/160051683820200919.jpg",
  },
  {
    product_name: "Nutrozen",
    image_url:
      "https://www.crystalcropprotection.com/images/cropProtection/160051731820200919.jpg",
  },
  {
    product_name: "Talwar Zinc Super-14",
    image_url:
      "https://www.crystalcropprotection.com/images/cropProtection/160066289120200921.jpg",
  },
  {
    product_name: "Talwar Zinc",
    image_url:
      "https://www.crystalcropprotection.com/images/cropProtection/160066321820200921.jpg",
  },
  {
    product_name: "Penitro",
    image_url:
      "https://www.crystalcropprotection.com/images/cropProtection/160066347620200921.jpg",
  },
  {
    product_name: "Nutrozen paddy",
    image_url:
      "https://www.crystalcropprotection.com/images/cropProtection/160292795920201017.jpg",
  },
  {
    product_name: "Cryzib Plus",
    image_url:
      "https://www.crystalcropprotection.com/images/cropProtection/165052885920220421.jpg",
  },
];

// 🗂️ Directory to save downloaded images
const imageDir = path.resolve("./products");
if (!fs.existsSync(imageDir)) fs.mkdirSync(imageDir);

function downloadImage(url, filename) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(filename);
    const protocol = url.startsWith("https") ? https : http;

    protocol
      .get(url, (response) => {
        if (response.statusCode !== 200) {
          file.close();
          if (fs.existsSync(filename)) {
            fs.unlinkSync(filename);
          }
          return reject(`Failed: ${url} (HTTP ${response.statusCode})`);
        }
        response.pipe(file);
        file.on("finish", () => {
          file.close(resolve);
        });
      })
      .on("error", (err) => {
        file.close();
        if (fs.existsSync(filename)) {
          fs.unlinkSync(filename);
        }
        reject(err.message);
      });
  });
}

async function processProducts() {
  const finalProducts = [];
  let successfulDownloads = 0;

  for (const [index, product] of products.entries()) {
    try {
      // Extract file extension from URL
      const url = new URL(product.image_url);
      const ext = path.extname(url.pathname) || ".jpg";

      // Sanitized name for safer file naming
      const safeName = product.product_name
        .replace(/[^a-z0-9]/gi, "_")
        .toLowerCase();
      const filePath = path.join(imageDir, `${safeName}${ext}`);

      console.log(
        `⬇️ Downloading (${index + 1}/${products.length}): ${
          product.product_name
        }`
      );
      await downloadImage(product.image_url, filePath);

      finalProducts.push({
        product_name: product.product_name,
        image_path: `./products/${path.basename(filePath)}`,
      });
      successfulDownloads++;
    } catch (error) {
      console.error(`❌ Error for ${product.product_name}: ${error}`);
    }
  }

  // Ensure file list is saved even if some downloads fail
  fs.writeFileSync("productList.json", JSON.stringify(finalProducts, null, 2));
  console.log(`\n---`);
  console.log(
    `✅ Done! Processed ${products.length} products. Successfully saved ${successfulDownloads} image paths to productList.json`
  );
}

processProducts();
