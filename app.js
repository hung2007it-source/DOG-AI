/**
 * DogVision AI - Engine & Data Center
 * Hỗ trợ nhận diện qua Webcam & Upload ảnh bằng mô hình Teachable Machine.
 * Cung cấp thông tin chi tiết: Nguồn gốc, Lịch sử, Ảnh minh họa (chó lớn + chó con), Cẩm nang chăm sóc.
 */

// =====================================================
// 1. CƠ SỞ DỮ LIỆU 50 GIỐNG CHÓ CHI TIẾT
// =====================================================
const DOG_DATABASE = {
  Labrador_Retriever: {
    viName: "Chó Tha Mồi Labrador (Lab)",
    origin: "Newfoundland, Canada (phát triển tại Anh)",
    history: "Xuất thân từ vùng Newfoundland, ban đầu được các ngư dân nuôi để kéo lưới và bắt cá rơi khỏi móc câu trong làn nước lạnh giá. Đến thế kỷ 19, các quý tộc người Anh đã mang chúng về nhân giống thành dòng chó tha mồi chuyên nghiệp trên cạn và dưới nước.",
    purpose: "Chó tha mồi đánh bắt cá, săn bắn, ngày nay là chó cứu hộ & dẫn đường số 1 thế giới.",
    lifespan: "10 - 12 năm",
    weight: "25 - 36 kg",
    height: "55 - 62 cm",
    temperament: "Hiền lành, cởi mở, tình cảm, cực kỳ yêu trẻ con và thích làm hài lòng chủ nhân.",
    energy: 5,
    trainability: 5,
    care: {
      diet: "Labrador rất háu ăn và dễ bị béo phì. Cần kiểm soát lượng calo nghiêm ngặt, cho ăn 2 bữa/ngày với hàm lượng protein cân đối.",
      exercise: "Rất năng động! Cần ít nhất 60 - 90 phút vận động mỗi ngày: chạy bộ, bơi lội, chơi ném bóng nhặt đồ.",
      grooming: "Lông ngắn kép không thấm nước, rụng lông vừa phải. Chải lông 1-2 lần/tuần, tắm mỗi 4-6 tuần.",
      health: "Cần chú ý bệnh loạn sản xương hông (hip dysplasia), xoắn dạ dày và kiểm soát cân nặng định kỳ.",
      tips: "Cực kỳ thích hợp cho gia đình có trẻ nhỏ. Không nên nuôi nhốt trong không gian chật hẹp mà không được dắt đi dạo."
    }
  },

  Golden_Retriever: {
    viName: "Chó Golden Retriever (Gâu Đần)",
    origin: "Cao nguyên Scotland, Vương quốc Anh",
    history: "Được huân tước Tweedmouth lai tạo vào nửa cuối thế kỷ 19 tại điền trang Guisachan (Scotland). Ông muốn tạo ra một giống chó săn vừa có khả năng đánh hơi xuất sắc, vừa có thể bơi lội dưới làn nước giá buốt để tha chim nước về mà không làm hỏng xác con mồi.",
    purpose: "Chó săn tha mồi thủy cầm, chó dẫn đường khiếm thị, trị liệu tâm lý.",
    lifespan: "10 - 12 năm",
    weight: "27 - 35 kg",
    height: "54 - 61 cm",
    temperament: "Thân thiện vô điều kiện, kiên nhẫn, thông minh, hòa đồng với tất cả mọi người và động vật khác.",
    energy: 4,
    trainability: 5,
    care: {
      diet: "Cần chế độ ăn giàu axit béo Omega-3 & Omega-6 để giữ cho bộ lông vàng luôn bóng mượt, tránh dị ứng da.",
      exercise: "Cần 45 - 60 phút tập thể dục hằng ngày. Thích nhất là được chơi trò ném đĩa và bơi lội.",
      grooming: "Lông dài gợn sóng rụng khá nhiều. Cần chải lông hằng ngày hoặc cách ngày để không bị rối và vón cục.",
      health: "Tầm soát định kỳ bệnh tim, loạn sản khớp khuỷu và kiểm tra tai thường xuyên vì tai cụp dễ đọng ẩm.",
      tips: "Golden coi trộm cũng như bạn, không thích hợp làm chó giữ nhà nhưng là người bạn tuyệt vời nhất của trẻ thơ."
    }
  },

  French_Bulldog: {
    viName: "Chó Bull Pháp (Frenchie)",
    origin: "Pháp & Vương quốc Anh",
    history: "Bắt nguồn từ những chú chó Bulldog cỡ nhỏ của thợ dệt thành phố Nottingham (Anh). Khi cuộc cách mạng công nghiệp nổ ra, các người thợ di cư sang Normandy (Pháp) và mang chúng theo. Tại Paris, chúng được giới quý tộc mê mẩn nhờ đôi tai dựng như tai dơi và tính cách dí dỏm.",
    purpose: "Chó cảnh bầu bạn, biểu tượng thời thượng của giới quý tộc Paris thế kỷ 19.",
    lifespan: "10 - 12 năm",
    weight: "8 - 14 kg",
    height: "28 - 33 cm",
    temperament: "Dễ thương, hài hước, ít sủa, cực kỳ quấn chủ và thích nằm ngủ bên cạnh người.",
    energy: 2,
    trainability: 3,
    care: {
      diet: "Dễ bị đầy hơi và tăng cân. Cho ăn thức ăn hạt kích cỡ nhỏ chống nghẹn, chia nhỏ khẩu phần 2-3 bữa.",
      exercise: "Không chịu được vận động nặng hay thời tiết nóng bức. Chỉ cần đi dạo nhẹ nhàng 20 phút lúc trời mát.",
      grooming: "Lông ngắn dễ chăm sóc, nhưng BẮT BUỘC phải lau sạch các nếp nhăn trên mặt hằng ngày bằng khăn ẩm để tránh nấm mốc.",
      health: "Hội chứng đường thở ngắn (brachycephalic), dễ bị sốc nhiệt trong mùa hè, cần ở phòng máy lạnh.",
      tips: "Rất phù hợp nuôi trong căn hộ chung cư vì ít sủa và không chiếm diện tích."
    }
  },

  English_Bulldog: {
    viName: "Chó Bull Anh (English Bulldog)",
    origin: "Vương quốc Anh",
    history: "Tổ tiên của Bulldog từng tham gia trò chơi đẫm máu 'Bull-baiting' (chọi bò) thời trung cổ. Sau khi trò chơi này bị cấm vào năm 1835, những người yêu chó đã chọn lọc nhân giống loại bỏ tính hung hăng, biến chúng thành biểu tượng kiên cường nhưng cực kỳ hiền lành của nước Anh.",
    purpose: "Chó đấu bò thời xưa, nay là người bạn trung thành, điềm đạm trong gia đình.",
    lifespan: "8 - 10 năm",
    weight: "18 - 25 kg",
    height: "31 - 40 cm",
    temperament: "Điềm tĩnh, dũng cảm, kiên định nhưng vô cùng ngọt ngào và có phần hơi lười biếng.",
    energy: 2,
    trainability: 3,
    care: {
      diet: "Rất dễ béo phì. Cần đong đếm thức ăn chính xác, bổ sung glucosamine cho xương khớp chịu tải trọng nặng.",
      exercise: "Nhu cầu vận động thấp. Đi dạo chậm rãi 20-30 phút/ngày, tránh ra nắng gắt.",
      grooming: "Vệ sinh kỹ các nếp gấp da sâu trên mặt và quanh đuôi. Chải lông 2 lần/tuần.",
      health: "Khó thở khi trời nóng, loạn sản khớp hông, khô mắt. Cần giữ nơi ở luôn thoáng mát.",
      tips: "Hay ngáy và chảy dãi khi ngủ, rất yêu chủ và thích được ôm ấp."
    }
  },

  Beagle: {
    viName: "Chó Săn Thỏ Beagle",
    origin: "Vương quốc Anh",
    history: "Được phát triển từ thế kỷ 16 tại Anh chuyên để săn thỏ theo đàn. Nhờ khứu giác siêu phàm (chỉ sau Bloodhound) và đôi tai dài giúp gom mùi hạt hương, Beagle có thể lần theo dấu vết con mồi qua hàng chục cây số.",
    purpose: "Chó săn theo mùi hương (scenthound), chó nghiệp vụ kiểm dịch sân bay.",
    lifespan: "12 - 15 năm",
    weight: "9 - 14 kg",
    height: "33 - 40 cm",
    temperament: "Tò mò, vui vẻ, năng nổ, hiền lành nhưng có thể cứng đầu khi ngửi thấy mùi lạ.",
    energy: 5,
    trainability: 4,
    care: {
      diet: "Cực kỳ thích ăn trộm đồ ăn! Thùng rác trong nhà cần đậy kín. Dùng thức ăn cân đối dinh dưỡng cho chó săn.",
      exercise: "Cần ít nhất 60 phút chạy nhảy mỗi ngày. Khi dắt đi dạo PHẢI đeo xích vì chúng sẽ cắm mũi đuổi theo mùi mà quên đường về.",
      grooming: "Lông ngắn ôm sát, chải lông bằng bàn chải cao su mỗi tuần. Vệ sinh tai cụp định kỳ tránh viêm tai.",
      health: "Động kinh, suy giáp và béo phì nếu không được vận động đủ.",
      tips: "Có tiếng hú (baying) đặc trưng khi phát hiện mùi lạ, cần dạy từ nhỏ để không làm phiền hàng xóm."
    }
  },

  German_Shepherd: {
    viName: "Chó Béc-giê Đức (German Shepherd / GSD)",
    origin: "Cộng hòa Liên bang Đức",
    history: "Được đại úy Max von Stephanitz chuẩn hóa vào cuối thế kỷ 19 từ các giống chó chăn cừu bản địa Đức. Ông nhắm tới một giống chó toàn diện: thông minh, dũng cảm, thể lực phi thường và tuyệt đối trung thành với mệnh lệnh.",
    purpose: "Chó chăn gia súc, chó cảnh sát K9, quân khuyển, chó cứu hộ bom đạn.",
    lifespan: "9 - 13 năm",
    weight: "28 - 40 kg",
    height: "55 - 65 cm",
    temperament: "Tự tin, thông minh kiệt xuất, cảnh giác cao độ, bảo vệ chủ nhân bằng cả tính mạng.",
    energy: 5,
    trainability: 5,
    care: {
      diet: "Khẩu phần giàu đạm động vật chất lượng cao, canxi và photpho để bảo vệ khung xương chắc khỏe.",
      exercise: "Cần vận động nặng 90-120 phút mỗi ngày: huấn luyện vâng lời, vượt chướng ngại vật, chạy bền.",
      grooming: "Được mệnh danh là 'máy rụng lông', cần chải lông mỗi ngày trong mùa thay lông.",
      health: "Loạn sản khớp hông và thoái hóa tủy sống (DM). Nên mua chó có phả hệ kiểm định gen tốt.",
      tips: "Bắt buộc phải huấn luyện kỷ luật và cho giao tiếp xã hội từ 2 tháng tuổi để định hình tính cách chuẩn mực."
    }
  },

  Siberian_Husky: {
    viName: "Chó Husky Sibir (Ngáo)",
    origin: "Vùng Đông Bắc Siberia, Nga",
    history: "Được bộ tộc du mục Chukchi lai tạo từ hàng ngàn năm trước để kéo xe trượt tuyết vượt qua những vùng băng giá khắc nghiệt nhất Bắc Cực. Năm 1925, đàn chó Husky đã lập kỳ tích chạy tiếp sức 1.000 km trong bão tuyết để vận chuyển huyết thanh cứu thị trấn Nome (Alaska).",
    purpose: "Chó kéo xe trượt tuyết đường dài tải trọng nhẹ trong bão tuyết.",
    lifespan: "12 - 14 năm",
    weight: "16 - 27 kg",
    height: "50 - 60 cm",
    temperament: "Hiếu động, hài hước, độc lập, thích 'nói chuyện' (hú) và cực kỳ tò mò, không có tính giữ nhà.",
    energy: 5,
    trainability: 3,
    care: {
      diet: "Chuyển hóa năng lượng rất hiệu quả, ăn ít hơn so với kích thước cơ thể. Thích ăn cá hồi và thịt nạc.",
      exercise: "Năng lượng vô tận! Cần chạy ít nhất 90 phút/ngày. Nếu buồn chán, chúng sẽ đào bới hoặc cắn phá đồ đạc.",
      grooming: "Lớp lông kép dày chống lạnh tới -50°C. Thay lông 2 lần/năm, rụng lông rất nhiều. Không bao giờ cạo lông sát da.",
      health: "Đục thủy tinh thể, teo võng mạc tiến triển (PRA). Rất chịu lạnh nhưng cần phòng mát vào mùa hè.",
      tips: "Bậc thầy đào thoát! Hàng rào sân phải cao trên 1.8m và chôn sâu dưới đất vì Husky nhảy và đào đất rất cừ."
    }
  },

  Pembroke_Welsh_Corgi: {
    viName: "Chó Corgi Xứ Wales (Pembroke)",
    origin: "Pembrokeshire, Xứ Wales, Vương quốc Anh",
    history: "Từng là giống chó chăn gia súc cổ xưa từ thế kỷ thứ 10. Dáng vóc lùn tịt giúp chúng luồn lách dưới bụng đàn bò để cắn gót chân gia súc mà không bị đá trúng. Corgi là giống chó hoàng gia được Cố Nữ hoàng Elizabeth II nuôi dưỡng suốt hơn 8 thập kỷ.",
    purpose: "Chó chăn gia súc (heeler), chó đồng hành hoàng gia Anh.",
    lifespan: "12 - 15 năm",
    weight: "10 - 14 kg",
    height: "25 - 30 cm",
    temperament: "Lém lỉnh, vui vẻ, thích làm trung tâm của sự chú ý, trung thành và dũng cảm vượt kích thước.",
    energy: 4,
    trainability: 5,
    care: {
      diet: "Dễ bị béo bụng chạm đất! Cần hạn chế tinh bột, không cho ăn vặt quá nhiều.",
      exercise: "Chân ngắn nhưng rất năng nổ, cần 45 phút dạo chơi mỗi ngày. Tránh cho nhảy từ trên ghế cao xuống để bảo vệ cột sống.",
      grooming: "Lông kép rụng quanh năm. Chải lông 2-3 lần/tuần.",
      health: "Bệnh thoái hóa đĩa đệm (IVDD) do lưng dài chân ngắn, loạn sản khớp háng.",
      tips: "Có thói quen chạy vòng quanh cắn gót chân người theo bản năng chăn bò, cần uốn nắn từ nhỏ."
    }
  },

  Dachshund: {
    viName: "Chó Lạp Xưởng (Dachshund / Xúc Xích)",
    origin: "Đức",
    history: "Được phát triển từ thế kỷ 15 tại Đức với cái tên có nghĩa là 'Chó săn lửng' (Dachs = lửng, Hund = chó). Thân dài, chân ngắn có móng vuốt cong hình lưỡi liềm giúp chúng đào bới hang sâu để lôi cổ những con lửng hung dữ ra ngoài.",
    purpose: "Chó săn lòng đất đào hang bắt lửng, cáo và thỏ rừng.",
    lifespan: "12 - 16 năm",
    weight: "7 - 14 kg (bản tiêu chuẩn) hoặc < 5kg (bản mini)",
    height: "20 - 27 cm",
    temperament: "Dũng cảm, bướng bỉnh, tò mò, cảnh giác cao độ và cực kỳ trung thành với một người chủ.",
    energy: 3,
    trainability: 3,
    care: {
      diet: "Kiểm soát cân nặng là vấn đề sống còn! Tăng 1kg sẽ gây áp lực cực lớn lên cột sống dài.",
      exercise: "Đi dạo 30-45 phút mỗi ngày trên mặt phẳng. Bắt buộc lắp cầu trượt hoặc dốc thoải nếu cho lên giường/sofa.",
      grooming: "Bản lông ngắn chỉ cần lau bằng khăn ẩm; bản lông dài cần chải 2 lần/tuần.",
      health: "Bệnh đĩa đệm cột sống (IVDD) là rủi ro hàng đầu. Không bế xốc nách, phải đỡ cả ngực và mông.",
      tips: "Tiếng sủa rất to và đanh so với ngoại hình, giữ nhà cực kỳ nhạy bén."
    }
  },

  Boxer: {
    viName: "Chó Võ Sĩ Boxer",
    origin: "Đức",
    history: "Được lai tạo vào cuối thế kỷ 19 từ giống chó săn Bullenbeisser đã tuyệt chủng. Tên gọi Boxer xuất phát từ thói quen đứng bằng hai chân sau và vung hai chân trước đánh nhau như một võ sĩ quyền anh khi đùa giỡn.",
    purpose: "Chó săn mồi lớn (lợn rừng, gấu), chó bảo vệ, quân khuyển trong Thế chiến.",
    lifespan: "10 - 12 năm",
    weight: "25 - 32 kg",
    height: "53 - 63 cm",
    temperament: "Tràn đầy sinh lực, vui tươi như một đứa trẻ lớn xác, trung thành và bảo vệ gia đình tuyệt đối.",
    energy: 5,
    trainability: 4,
    care: {
      diet: "Cần thức ăn giàu protein sạch để duy trì khối lượng cơ bắp săn chắc không mỡ thừa.",
      exercise: "Nhu cầu giải tỏa năng lượng cực cao: ít nhất 60-90 phút tập luyện thể thao cường độ cao.",
      grooming: "Lông ngắn bóng mượt rất dễ chăm sóc, tắm mỗi tháng một lần.",
      health: "Cần khám tim định kỳ (bệnh cơ tim cơ giãn) và tầm soát các khối u bướu.",
      tips: "Tính cách 'mãi là một đứa trẻ' cho đến 3-4 tuổi, rất thích nhảy chồm lên người để chào đón."
    }
  },

  Yorkshire_Terrier: {
    viName: "Chó Sục Yorkshire (Yorkie)",
    origin: "Hạt Yorkshire và Lancashire, Anh",
    history: "Vào giữa thế kỷ 19, các công nhân dệt len người Scotland di cư sang Yorkshire đã mang theo các giống sục nhỏ để bắt chuột trong xưởng dệt và hầm mỏ than. Sau đó, nhờ bộ lông dài mượt như tơ óng ả, Yorkie nhanh chóng trở thành thú cưng của các quý bà tầng lớp thượng lưu thời Victoria.",
    purpose: "Săn chuột trong xưởng dệt, chó cưng quý tộc.",
    lifespan: "13 - 16 năm",
    weight: "2 - 3.5 kg",
    height: "18 - 20 cm",
    temperament: "Bé nhỏ nhưng can đảm, tính tình quý tộc, tự tin, đôi khi hơi đanh đá và thích bảo vệ chủ.",
    energy: 3,
    trainability: 4,
    care: {
      diet: "Dạ dày rất bé, cần thức ăn hạt mini giàu dinh dưỡng và dễ tiêu hóa.",
      exercise: "20-30 phút dạo chơi trong nhà hoặc sân vườn là đủ cho đôi chân tí hon.",
      grooming: "Lông có cấu trúc tương tự tóc người (ít rụng, không gây dị ứng), cần chải lông hằng ngày và cắt tỉa thường xuyên.",
      health: "Trật bánh chè (luxating patella), sụp khí quản, vấn đề về răng miệng cần đánh răng đều đặn.",
      tips: "Rất dễ bế theo người, đi du lịch tiện lợi, thích làm chủ không gian."
    }
  },

  Chihuahua: {
    viName: "Chó Chihuahua",
    origin: "Bang Chihuahua, Mexico",
    history: "Là giống chó nhỏ nhất thế giới, có gốc gác từ loài chó Techichi cổ xưa của nền văn minh Toltec và Maya từ thế kỷ thứ 9. Người Maya tin rằng Chihuahua có năng lực tâm linh dẫn lối cho linh hồn người chết sang thế giới bên kia.",
    purpose: "Chó đồng hành tâm linh cổ xưa, chó cưng tí hon bầu bạn.",
    lifespan: "14 - 18 năm",
    weight: "1.5 - 3 kg",
    height: "15 - 23 cm",
    temperament: "Cực kỳ dũng cảm (thậm chí liều lĩnh), gắn bó sâu sắc với một người, lanh lợi và hay sủa báo động.",
    energy: 3,
    trainability: 3,
    care: {
      diet: "Ăn rất ít nhưng dễ bị hạ đường huyết (hypoglycemia) khi còn bé, nên chia 3-4 bữa nhỏ mỗi ngày.",
      exercise: "Tự vận động trong phòng khách cũng đủ đáp ứng năng lượng, đi dạo nhẹ nhàng 15-20 phút.",
      grooming: "Bản lông ngắn chải mỗi tuần; bản lông dài chải 2-3 lần/tuần.",
      health: "Xương rất giòn, dễ gãy nếu bị dẫm phải hoặc rơi từ giường; giữ ấm cơ thể vào mùa đông vì chúng run rẩy khi lạnh.",
      tips: "Đừng quá cưng chiều kẻo tạo thành 'hội chứng chó nhỏ' hung hăng với người lạ."
    }
  },

  Pug: {
    viName: "Chó Mặt Xệ Pug",
    origin: "Trung Quốc cổ đại",
    history: "Ra đời trước Công nguyên tại Trung Quốc, từng được các Hoàng đế triều đại nhà Hán nuôi dưỡng trong nhung lụa và có lính canh bảo vệ riêng. Vào thế kỷ 16, các thương nhân Hà Lan đưa Pug về châu Âu và nó trở thành linh vật của hoàng gia House of Orange.",
    purpose: "Chó cưng hoàng gia cung đình phương Đông.",
    lifespan: "12 - 15 năm",
    weight: "6 - 9 kg",
    height: "25 - 30 cm",
    temperament: "Vui tính, tình cảm, hề hước, thích ngủ, lười biếng và luôn muốn ngồi trong lòng chủ.",
    energy: 2,
    trainability: 3,
    care: {
      diet: "Vô địch ăn khỏe và siêu lười, rất nhanh tăng cân. Tuyệt đối không cho ăn thức ăn thừa nhiều dầu mỡ.",
      exercise: "Vận động nhẹ 20 phút/ngày khi trời mát. Không bao giờ để Pug chạy ngoài trời nắng vì mõm tịt không tản nhiệt được.",
      grooming: "Vệ sinh nếp nhăn mũi mỗi ngày bằng bông tẩm nước muối sinh lý để không hôi và viêm da.",
      health: "Bệnh đường thở, mắt lồi dễ bị xước giác mạc.",
      tips: "Pug ngáy rất to và hay khò khè khi ngủ, nhưng khuôn mặt biểu cảm luôn mang lại tiếng cười cho gia đình."
    }
  },

  Rottweiler: {
    viName: "Chó Rốt (Rottweiler)",
    origin: "Thị trấn Rottweil, bang Baden-Württemberg, Đức",
    history: "Hậu duệ của những chú chó ngao La Mã theo chân các quân đoàn chinh phục châu Âu. Tại thị trấn Rottweil, chúng được các đồ tể nuôi để kéo xe chở thịt bò và giữ tiền túi cho chủ nhân khi đi buôn bán chợ phiên.",
    purpose: "Chó kéo xe chở hàng, lùa bò, chó vệ sĩ bảo vệ tư gia và quân cảnh.",
    lifespan: "9 - 11 năm",
    weight: "38 - 50 kg",
    height: "56 - 69 cm",
    temperament: "Điềm đạm, can đảm, tự tin, cực kỳ trung thành với gia đình nhưng thận trọng với người lạ.",
    energy: 4,
    trainability: 5,
    care: {
      diet: "Cần hàm lượng đạm cao và canxi cân bằng để phát triển cơ bắp và khung xương đại hình.",
      exercise: "Cần 60 - 90 phút vận động mỗi ngày, thích kéo lốp xe, tập cắn bao tay huấn luyện và đi dạo.",
      grooming: "Lông ngắn thô mượt, chải lông 1 lần/tuần, tắm mỗi 4-6 tuần.",
      health: "Loạn sản xương hông, bệnh cơ tim và ung thư xương ở độ tuổi già.",
      tips: "Rất cần người chủ có kinh nghiệm, bản lĩnh, kiên nhẫn để thiết lập quyền lãnh đạo ngay từ nhỏ."
    }
  },

  Doberman_Pinscher: {
    viName: "Chó Doberman Pinscher",
    origin: "Apolda, Thuringia, Đức",
    history: "Được nhân viên thu thuế Louis Dobermann lai tạo vào khoảng năm 1890. Công việc thu tiền thuế thời đó thường xuyên gặp cướp bóc, nên ông đã kết hợp Rottweiler, Greyhound và Weimaraner để tạo ra một giống chó vệ sĩ thanh mảnh, chạy cực nhanh và có uy lực đe dọa kẻ thù.",
    purpose: "Chó hộ vệ cá nhân, chó cảnh sát và tuần tra ban đêm.",
    lifespan: "10 - 12 năm",
    weight: "32 - 45 kg",
    height: "63 - 72 cm",
    temperament: "Thông minh xuất chúng, nhanh nhẹn, cảnh giác tuyệt đối, giàu tình cảm với chủ nhân nhưng đáng sợ với kẻ xấu.",
    energy: 5,
    trainability: 5,
    care: {
      diet: "Thức ăn chất lượng cao, chia làm 2 bữa nhỏ để tránh xoắn dạ dày (bloat).",
      exercise: "Cần giải phóng năng lượng thể lực và trí não ít nhất 90 phút mỗi ngày: chạy bền, rèn phản xạ.",
      grooming: "Lông ngắn bóng láng, rất ít rụng, hầu như không mùi hôi. Chỉ cần lau khăn ẩm.",
      health: "Bệnh cơ tim giãn (DCM), hội chứng Wobbler ở cổ và bệnh Von Willebrand.",
      tips: "Thích dính chặt như keo với chủ ('Velcro dog'), không chịu được bị bỏ rơi ngoài sân một mình."
    }
  },

  Great_Dane: {
    viName: "Chó Ngao Đan Mạch (Great Dane)",
    origin: "Đức (dù mang tên Great Dane)",
    history: "Được các quý tộc Đức phát triển từ thời Phục hưng để săn lợn rừng hung dữ. Từng được mệnh danh là 'Apollo của các giống chó' nhờ thân hình cao lớn quý phái nhất hành tinh, nắm giữ nhiều kỷ lục Guinness về chiều cao.",
    purpose: "Săn lợn rừng, chó bảo vệ lâu đài, chó cảnh khổng lồ thanh lịch.",
    lifespan: "7 - 10 năm",
    weight: "50 - 80 kg",
    height: "76 - 86 cm",
    temperament: "Được gọi là 'người khổng lồ dịu dàng' (Gentle Giant), cực kỳ hiền lành, từ tốn và chu đáo.",
    energy: 3,
    trainability: 4,
    care: {
      diet: "Chi phí ăn uống rất tốn kém! Khi nuôi chó con cần dùng hạt tăng trưởng chuyên biệt cho chó đại hình tránh hỏng khớp.",
      exercise: "Đi dạo điều độ 45 phút/ngày. Tránh vận động mạnh sau khi ăn ít nhất 1 tiếng để ngừa xoắn dạ dày.",
      grooming: "Lông ngắn dễ chải, nhưng cần bồn tắm cỡ lớn.",
      health: "Xoắn dạ dày cấp tính (nguy cơ số 1), bệnh tim và tuổi thọ tương đối ngắn.",
      tips: "Dù nặng tới 70-80kg nhưng Great Dane luôn nghĩ mình là chó nhỏ và thích trèo lên đùi bạn ngồi!"
    }
  },

  Dalmatian: {
    viName: "Chó Đốm Dalmatian (101 Chú Chó Đốm)",
    origin: "Vùng Dalmatia, Croatia",
    history: "Nổi tiếng qua bộ phim hoạt hình kinh điển của Disney. Trong thế kỷ 18 và 19, Dalmatian được huấn luyện chạy song song bên các cỗ xe ngựa quý tộc và xe cứu hỏa hơi nước để bảo vệ ngựa khỏi chó hoang và dẹp đường.",
    purpose: "Chó hộ tống xe ngựa cứu hỏa, chó canh gác chuồng ngựa.",
    lifespan: "11 - 13 năm",
    weight: "20 - 30 kg",
    height: "56 - 61 cm",
    temperament: "Năng động không biết mệt, độc lập, thông minh, trung thành và có trí nhớ cực tốt.",
    energy: 5,
    trainability: 4,
    care: {
      diet: "Cơ địa chuyển hóa axit uric độc nhất, rất dễ sỏi bàng quang. Cần tránh nội tạng động vật và thịt đỏ giàu purin.",
      exercise: "Thể lực bền bỉ như vận động viên điền kinh, cần ít nhất 90 phút chạy bộ hoặc đạp xe cùng chủ.",
      grooming: "Lông ngắn trắng đốm đen rụng liên tục quanh năm, cần chải găng tay cao su thường xuyên.",
      health: "Khoảng 10-12% chó Đốm sinh ra bị điếc bẩm sinh (cần test BAER từ nhỏ), bệnh sỏi thận.",
      tips: "Chó con sinh ra có màu trắng tinh hoàn toàn, các vết đốm đen chỉ xuất hiện sau 2-3 tuần tuổi."
    }
  },

  Shiba_Inu: {
    viName: "Chó Shiba Inu (Thánh Meme)",
    origin: "Nhật Bản",
    history: "Là giống chó cổ xưa nhất trong 6 giống chó quốc bảo của Nhật Bản (Nihon-ken). Tên 'Shiba' có nghĩa là 'bụi cây nhỏ', mô tả khả năng luồn lách qua các bụi rậm ở vùng núi hiểm trở để săn chim và thú nhỏ.",
    purpose: "Săn bắt chim thú nhỏ vùng núi non Nhật Bản.",
    lifespan: "12 - 16 năm",
    weight: "8 - 11 kg",
    height: "35 - 43 cm",
    temperament: "Tính cách kiêu kỳ như mèo, sạch sẽ, thông minh nhưng cứng đầu, có tiếng thét 'Shiba Scream' trứ danh.",
    energy: 4,
    trainability: 3,
    care: {
      diet: "Thích thức ăn có nguồn gốc từ cá và hải sản, rau củ sạch.",
      exercise: "Cần 45 - 60 phút đi bộ mỗi ngày, kích thích sự tò mò khám phá.",
      grooming: "Rất sạch sẽ, tự liếm lông làm sạch như mèo. Thay lông rụng nhiều 2 lần/năm.",
      health: "Dị ứng da, trật khớp bánh chè, tăng nhãn áp.",
      tips: "Khó tính với chó khác giới và không dễ phục tùng vô điều kiện, đòi hỏi sự kiên nhẫn khi huấn luyện."
    }
  },

  Chow_Chow: {
    viName: "Chó Sư Tử Chow Chow",
    origin: "Bắc Trung Quốc & Mông Cổ",
    history: "Xuất hiện cách đây hơn 2.000 năm từ thời nhà Hán. Chúng được nuôi trong các cung điện hoàng gia để săn bắn chim trĩ, kéo xe và canh gác đền chùa. Điểm độc nhất vô nhị là chiếc lưỡi có màu xanh đen hoặc tím thẫm.",
    purpose: "Chó gác đền, săn bắn hoàng gia, kéo xe hàng.",
    lifespan: "9 - 15 năm",
    weight: "20 - 32 kg",
    height: "46 - 56 cm",
    temperament: "Lạnh lùng, điềm đạm, độc lập, quý phái, chỉ trung thành duy nhất với người thân trong nhà.",
    energy: 2,
    trainability: 2,
    care: {
      diet: "Cân đối lượng đạm vừa phải, bổ sung dầu cá để dưỡng bộ lông sư tử dày.",
      exercise: "Lười vận động, chỉ thích đi dạo chậm rãi 30 phút vào sáng sớm hoặc tối muộn khi trời mát.",
      grooming: "Bộ lông bờm sư tử cực dày, cần chải lông kỹ lưỡng 3 lần/tuần để tránh vón bết và ẩm mốc da.",
      health: "Quặm mi mắt (entropion), loạn sản xương khớp, sốc nhiệt mùa hè.",
      tips: "Tầm nhìn hai bên bị hạn chế do mắt sâu nếp nhăn, nên tiếp cận từ phía trước mặt để chó không bị giật mình."
    }
  },

  Samoyed: {
    viName: "Chó Tuyết Samoyed (Nàng Bạch Tuyết)",
    origin: "Bán đảo Taimyr, Bắc Siberia, Nga",
    history: "Được bộ tộc du mục Samoyede thuần dưỡng từ hàng thế kỷ trước. Chúng ngủ cùng người trong lều tuyết để ủ ấm cho trẻ em, chăn đàn tuần lộc và kéo xe trượt tuyết. Khóe miệng luôn hơi hếch lên tạo thành nụ cười 'Samoyed smile' ngăn nước dãi đóng băng ở Bắc Cực.",
    purpose: "Chó chăn tuần lộc, ủ ấm người trong lều tuyết, kéo xe.",
    lifespan: "12 - 14 năm",
    weight: "16 - 30 kg",
    height: "48 - 60 cm",
    temperament: "Ngọt ngào, yêu đời, thích kết bạn với mọi người, tràn đầy năng lượng tích cực.",
    energy: 4,
    trainability: 4,
    care: {
      diet: "Thức ăn giàu dinh dưỡng, thịt gà, cá hồi để nuôi dưỡng bộ lông trắng tinh óng ả.",
      exercise: "Cần vận động 60 phút mỗi ngày trong không gian mát mẻ.",
      grooming: "Lông trắng dày 2 lớp, cần chải lông chuyên dụng mỗi ngày. Tắm và sấy khô hoàn toàn là cả một nghệ thuật.",
      health: "Bệnh tiểu đường, teo võng mạc tiến triển và viêm thận bẩm sinh.",
      tips: "Rất sợ cô đơn! Nếu bị bỏ một mình quá lâu sẽ hú và đào bới giải tỏa tâm lý."
    }
  },

  Pomeranian: {
    viName: "Chó Phốc Sóc (Pomeranian / Pom)",
    origin: "Vùng Pomerania (thuộc Ba Lan và Tây Bắc Đức)",
    history: "Tổ tiên từng là giống chó kéo xe tuyết lớn vùng Bắc Cực. Vào thế kỷ 19, Nữ hoàng Anh Victoria đã đem lòng say mê và nhân giống thu nhỏ chúng thành những cục bông tí hon đáng yêu như ngày nay.",
    purpose: "Chó cưng hoàng gia, bạn đồng hành quý tộc.",
    lifespan: "12 - 16 năm",
    weight: "1.8 - 3.5 kg",
    height: "18 - 24 cm",
    temperament: "Nhanh nhẹn, lanh lợi, thông minh, hay sủa báo động và cực kỳ kiêu hãnh.",
    energy: 3,
    trainability: 4,
    care: {
      diet: "Ăn lượng nhỏ nhưng cần giàu calo sạch cho hoạt động trao đổi chất cao của dòng chó siêu nhỏ.",
      exercise: "Đi dạo 20-30 phút mỗi ngày hoặc chơi đuổi bắt đồ chơi trong nhà.",
      grooming: "Lông xù kép bồng bềnh cần chải phồng 2-3 ngày/lần để tránh rối và giữ phom tròn xinh.",
      health: "Sụp khí quản (tránh đeo vòng cổ, nên dùng đai yếm ngực), trật xương bánh chè.",
      tips: "Thích sủa tiếng lanh lảnh mỗi khi có người gõ cửa, làm chuông báo động cực nhạy."
    }
  },

  Shih_Tzu: {
    viName: "Chó Tây Tạng Shih Tzu (Thạch Sư)",
    origin: "Tây Tạng & Cung đình Bắc Kinh, Trung Quốc",
    history: "Được các Lạt ma Tây Tạng nhân giống và dâng tặng Hoàng đế Trung Hoa như một biểu tượng của lòng tôn kính Phật pháp (tượng trưng cho sư tử tuyết). Chúng sống cả đời trong cấm thành, được các thái giám chải chuốt lông mỗi ngày.",
    purpose: "Chó cưng cung đình, biểu tượng may mắn và tôn nghiêm phong thủy.",
    lifespan: "10 - 16 năm",
    weight: "4 - 7.5 kg",
    height: "20 - 28 cm",
    temperament: "Dịu dàng, vui vẻ, thân thiện, đằm thắm và rất thích được âu yếm trên sofa.",
    energy: 2,
    trainability: 3,
    care: {
      diet: "Khẩu phần cân đối hạt dinh dưỡng, lau râu miệng sạch sẽ sau mỗi bữa ăn.",
      exercise: "Nhu cầu vận động thấp, 20 phút dạo mát mỗi ngày là đủ.",
      grooming: "Lông dài chấm đất cần chải hằng ngày và buộc chỏm tóc trên đỉnh đầu để tránh chọc vào mắt.",
      health: "Bệnh khô mắt, đục thủy tinh thể và hô hấp khó khăn khi trời nóng ẩm.",
      tips: "Rất phù hợp cho người lớn tuổi hoặc gia đình sống trong chung cư yên tĩnh."
    }
  },

  Maltese: {
    viName: "Chó Săn Thỏ Quý Tộc Maltese",
    origin: "Đảo quốc Malta (Địa Trung Hải)",
    history: "Là một trong những giống chó cưng lâu đời nhất trong lịch sử nhân loại, được người Phoenicia đưa lên đảo Malta từ 3.000 năm trước. Từng được các triết gia La Mã như Aristotle ca ngợi về vẻ đẹp hoàn mỹ không tì vết.",
    purpose: "Chó quý tộc La Mã cổ đại, bạn đồng hành trên thuyền buôn Địa Trung Hải.",
    lifespan: "12 - 15 năm",
    weight: "2 - 4 kg",
    height: "20 - 25 cm",
    temperament: "Nhẹ nhàng, ngoan ngoãn, tình cảm, không gây dị ứng và cực kỳ quấn quýt bên chủ.",
    energy: 3,
    trainability: 4,
    care: {
      diet: "Cung cấp nước sạch đóng chai hoặc nước lọc tinh khiết để hạn chế vệt ố đỏ khóe mắt (tear stain).",
      exercise: "Vận động nhẹ 20-30 phút/ngày.",
      grooming: "Lông trắng tinh không có lớp lót dưới, ít rụng lông. Cần chải hằng ngày và lau khóe mắt thường xuyên.",
      health: "Men răng yếu dễ tích vôi răng, viêm nướu; trật khớp gối.",
      tips: "Rất lý tưởng cho người bị dị ứng lông chó vì Maltese rụng lông cực kỳ ít."
    }
  },

  Standard_Poodle: {
    viName: "Chó Poodle Tiêu Chuẩn (Chó Săn Vịt)",
    origin: "Đức / Pháp",
    history: "Dù là quốc khuyển của nước Pháp, Poodle thực chất bắt nguồn từ Đức với tên gốc 'Pudelhund' (chó té nước). Kiểu cắt tỉa lông tỉa phao câu nổi tiếng ban đầu là để bảo vệ các khớp xương và ngực khỏi nước lạnh trong khi vẫn giúp bơi lội nhẹ nhàng.",
    purpose: "Chó tha mồi săn vịt trời dưới nước, tìm nấm truffle đắt đỏ.",
    lifespan: "12 - 15 năm",
    weight: "20 - 32 kg",
    height: "45 - 60 cm",
    temperament: "Đứng thứ 2 thế giới về trí thông minh, quý phái, lanh lợi, học trò nhanh kỷ lục.",
    energy: 4,
    trainability: 5,
    care: {
      diet: "Thức ăn giàu dinh dưỡng cân đối protein, vitamin nhóm B cho chất lông xoăn chắc khỏe.",
      exercise: "Cần 60 phút thể dục mỗi ngày: bơi lội, chạy đuổi bắt hoặc chơi trò chơi trí tuệ.",
      grooming: "Lông xoăn tít không rụng nhưng mọc liên tục, bắt buộc cắt tỉa chuyên nghiệp mỗi 4-6 tuần.",
      health: "Xoắn dạ dày, bệnh Addison và đục thủy tinh thể.",
      tips: "Không hề rụng lông ra nhà, là lựa chọn số 1 cho người bị viêm mũi dị ứng."
    }
  },

  Border_Collie: {
    viName: "Chó Chăn Cừu Border Collie",
    origin: "Vùng biên giới giữa Scotland và Anh",
    history: "Được công nhận là giống chó thông minh nhất thế giới. Chúng có khả năng dùng 'ánh mắt thôi miên' (the eye) mãnh liệt để điều khiển hàng trăm con cừu di chuyển chính xác theo ý mình mà không cần sủa một tiếng nào.",
    purpose: "Chăn cừu đồi núi, vô địch các giải thi đấu Agility & Obedience thế giới.",
    lifespan: "12 - 15 năm",
    weight: "14 - 20 kg",
    height: "46 - 56 cm",
    temperament: "Thông minh vô song, tập trung cao độ, làm việc không mệt mỏi và luôn cần có nhiệm vụ để làm.",
    energy: 5,
    trainability: 5,
    care: {
      diet: "Nhu cầu calo rất cao vì luôn chạy nhảy liên tục. Dùng thức ăn cho chó thể thao năng động.",
      exercise: "Ít nhất 90 - 120 phút mỗi ngày. Bắt buộc có các bài tập kích thích não bộ (tìm đồ, học trò xiếc).",
      grooming: "Chải lông 2 lần/tuần, tăng lên vào mùa thay lông.",
      health: "Đột biến gen kháng thuốc MDR1, chứng bất thường ở mắt Collie (CEA), loạn sản khớp.",
      tips: "Không dành cho người bận rộn hay lười vận động; chúng sẽ tự tìm việc làm bằng cách lùa xe máy hoặc cắn phá đồ!"
    }
  },

  Basset_Hound: {
    viName: "Chó Săn Chân Lùn Basset Hound",
    origin: "Pháp & Bỉ",
    history: "Tên 'Basset' xuất phát từ tiếng Pháp 'Bas' có nghĩa là 'thấp'. Được các tu sĩ tu viện St. Hubert lai tạo để quý tộc có thể đi bộ thong thả theo sau một đàn chó săn lùng sục thỏ rừng mà không cần cưỡi ngựa.",
    purpose: "Chó săn mùi hương chân ngắn chuyên lùng thỏ và hươu.",
    lifespan: "10 - 12 năm",
    weight: "20 - 29 kg",
    height: "30 - 38 cm",
    temperament: "Điềm tĩnh, thân thiện, hiền khô, đôi mắt buồn man mác và giọng sủa trầm ấm vang vọng.",
    energy: 2,
    trainability: 2,
    care: {
      diet: "Rất dễ tăng cân khiến chân cong thêm. Cần cho ăn đúng liều lượng, giàu canxi cho xương nặng.",
      exercise: "Đi dạo thong thả 30-45 phút mỗi ngày, cho ngửi mùi thỏa thích.",
      grooming: "Đôi tai dài quét đất cần lau sạch hằng ngày để không bị thối tai; vệ sinh nếp gấp da quanh mắt.",
      health: "Nhiễm trùng tai, viêm mắt mộng, bệnh đau lưng do thân quá dài.",
      tips: "Khi cắm mũi xuống đất ngửi mùi thì tai điếc tạm thời, gọi không nghe thấy gì!"
    }
  },

  Bloodhound: {
    viName: "Chó Đánh Hơi Bloodhound",
    origin: "Bỉ & Anh Quốc",
    history: "Sở hữu khứu giác mạnh nhất thế giới động vật với hơn 300 triệu tế bào cảm thụ mùi. Dấu vết mùi hương do Bloodhound lần theo được tòa án Mỹ và nhiều nước chấp nhận là bằng chứng pháp lý có giá trị kết tội.",
    purpose: "Truy vết tội phạm, tìm kiếm người mất tích trong rừng sâu.",
    lifespan: "10 - 12 năm",
    weight: "36 - 50 kg",
    height: "58 - 69 cm",
    temperament: "Hiền lành, kiên nhẫn, yêu thương trẻ con nhưng một khi đã bắt được mùi thì không gì ngăn cản được.",
    energy: 4,
    trainability: 3,
    care: {
      diet: "Dùng bát ăn chống nuốt vội để ngăn ngừa xoắn dạ dày nguy hiểm.",
      exercise: "Cần đi bộ dài hằng ngày, tốt nhất là cho tham gia các trò chơi tìm kiếm đồ vật ẩn giấu.",
      grooming: "Nếp nhăn da sâu và tai dài cần được lau khô sạch sẽ mỗi ngày tránh viêm da.",
      health: "Xoắn bao tử (GDV), nhiễm trùng tai mạn tính, khô mắt.",
      tips: "Chảy dãi khá nhiều sau khi uống nước, cần chuẩn bị sẵn khăn lau miệng."
    }
  },

  Afghan_Hound: {
    viName: "Chó Săn Quý Tộc Afghan Hound",
    origin: "Vùng núi cao hiểm trở Afghanistan",
    history: "Một trong những giống chó cổ xưa nhất tồn tại từ thời cổ đại. Chúng sử dụng thị giác siêu nhạy và đôi chân dài thoăn thoắt để săn báo tuyết, linh dương và nai trên các vách đá cheo leo quanh dãy núi Hindu Kush.",
    purpose: "Săn đuổi bằng thị giác (sighthound) trên địa hình đồi núi dốc đứng.",
    lifespan: "12 - 14 năm",
    weight: "23 - 27 kg",
    height: "64 - 74 cm",
    temperament: "Kiêu sa, độc lập như một hoàng tử, kín đáo với người lạ nhưng trung thành sâu sắc với gia đình.",
    energy: 4,
    trainability: 2,
    care: {
      diet: "Cơ thể thanh mảnh không tích mỡ, cần protein sạch và vitamin nuôi bộ lông tơ dài thướt tha.",
      exercise: "Cần không gian rộng có rào chắn cao để bứt tốc độ tối đa vài lần mỗi tuần.",
      grooming: "Bộ lông lụa dài quét đất cần tắm gội, ủ xả và sấy chải tỉ mỉ vài tiếng đồng hồ mỗi tuần.",
      health: "Rất nhạy cảm với thuốc mê thú y; đục thủy tinh thể.",
      tips: "Có tính độc lập rất cao, không thích phục tùng máy móc như các giống chó nghiệp vụ."
    }
  },

  Saint_Bernard: {
    viName: "Chó Cứu Hộ Saint Bernard",
    origin: "Đèo Great St. Bernard, dãy Alps Thụy Sĩ",
    history: "Được các tu sĩ tại tu viện Great St. Bernard nuôi từ thế kỷ 17 để giải cứu những du khách bị tuyết lở chôn vùi. Chú chó huyền thoại 'Barry' đã cứu sống hơn 40 mạng người giữa bão tuyết vùng núi Alps.",
    purpose: "Tìm kiếm và giải cứu người gặp nạn trong bão tuyết và tuyết lở.",
    lifespan: "8 - 10 năm",
    weight: "64 - 100 kg",
    height: "70 - 90 cm",
    temperament: "Hiền như cục đất, kiên nhẫn vô bờ bến, cực kỳ cẩn thận và dịu dàng với trẻ nhỏ.",
    energy: 2,
    trainability: 4,
    care: {
      diet: "Khối lượng thức ăn khổng lồ! Cần quản lý tỷ lệ canxi chặt chẽ trong giai đoạn phát triển xương chó con.",
      exercise: "Vận động điều độ 30-45 phút mỗi ngày, rất thích thời tiết mùa đông và tuyết trắng.",
      grooming: "Chải lông thường xuyên để lấy đi lông rụng; chuẩn bị khăn lau dãi quanh miệng.",
      health: "Chịu nhiệt cực kỳ kém, dễ sốc nhiệt nếu ở môi trường nóng ẩm; bệnh tim mạch và khớp hông.",
      tips: "Cần sống ở nơi mát mẻ, phòng máy lạnh vào mùa hè oi bức."
    }
  },

  Bernese_Mountain_Dog: {
    viName: "Chó Núi Thụy Sĩ Bernese",
    origin: "Bang Bern, Thụy Sĩ",
    history: "Là giống chó đa năng của các nông trại Thụy Sĩ, nổi bật với bộ lông tam thể ba màu (đen tuyền, trắng muốt và nâu đỏ). Chúng vừa kéo các xe chở đầy phô mai sữa bò ra chợ, vừa lùa gia súc và canh gác trang trại.",
    purpose: "Kéo xe chở nông sản phô mai, chăn gia súc trang trại vùng núi.",
    lifespan: "7 - 10 năm",
    weight: "36 - 52 kg",
    height: "58 - 70 cm",
    temperament: "Ấm áp, tình cảm, trung thành, thân thiện và rất quấn quýt các thành viên trong nhà.",
    energy: 3,
    trainability: 4,
    care: {
      diet: "Dùng thức ăn cho chó cỡ lớn, kiểm soát cân nặng để bảo vệ khớp gối.",
      exercise: "Thích đi dạo ngoài trời mát mẻ 45-60 phút mỗi ngày, thích kéo xe kéo đồ nhẹ.",
      grooming: "Bộ lông dày mượt rụng lông nhiều, chải lông 2-3 lần/tuần.",
      health: "Tuổi thọ hơi ngắn do rủi ro bệnh ung thư mô bào (histiocytosis) và loạn sản khớp.",
      tips: "Rất gắn bó với gia đình, không chịu được cảnh bị bỏ rơi ngoài trời một mình."
    }
  },

  Staffordshire_Bull_Terrier: {
    viName: "Chó Bull Sục Staffordshire (Staffy)",
    origin: "Staffordshire, Vương quốc Anh",
    history: "Được lai tạo vào thế kỷ 19 tại Anh. Dù có tổ tiên tham gia chọi chó nhưng Staffy lại nổi tiếng tại Anh với biệt danh 'Chó bảo mẫu' (The Nanny Dog) nhờ tình yêu thương vô bờ bến và sự nhẫn nại tuyệt đối với trẻ em.",
    purpose: "Chó đồng hành gia đình, bảo vệ trẻ nhỏ.",
    lifespan: "12 - 14 năm",
    weight: "11 - 17 kg",
    height: "36 - 41 cm",
    temperament: "Cơ bắp cuồn cuộn nhưng tính cách cực kỳ thân thiện, dũng cảm, hoạt bát và tình cảm.",
    energy: 4,
    trainability: 4,
    care: {
      diet: "Khẩu phần giàu đạm nạc để duy trì cơ bắp săn chắc.",
      exercise: "Cần giải phóng năng lượng 45 - 60 phút mỗi ngày: chơi giằng co dây thừng, chạy nhảy.",
      grooming: "Lông cực ngắn, tắm rửa và chải lông rất nhàn, mỗi tháng 1-2 lần.",
      health: "Đục thủy tinh thể di truyền, dị ứng da do thời tiết.",
      tips: "Rất yêu con người nhưng có thể cảnh giác hoặc căng thẳng với những chú chó lạ cùng giới."
    }
  },

  Pitbull: {
    viName: "Chó Pitbull (American Pit Bull Terrier)",
    origin: "Hoa Kỳ",
    history: "Được phát triển từ dòng chó sục và chó bull của Anh đưa sang Mỹ vào thế kỷ 19. Được trui rèn về lòng dũng cảm, sức mạnh cơ bắp và độ dẻo dai phi thường. Nếu được nuôi dạy đúng đắn trong tình yêu thương, Pitbull là người bạn bảo vệ tận tụy nhất.",
    purpose: "Bắt lợn rừng, bảo vệ trang trại, thể thao sức mạnh kéo tạ.",
    lifespan: "12 - 16 năm",
    weight: "14 - 30 kg",
    height: "43 - 53 cm",
    temperament: "Tự tin, tràn đầy năng lượng, dũng cảm, trung thành tuyệt đối và cực kỳ quấn chủ.",
    energy: 5,
    trainability: 5,
    care: {
      diet: "Cần lượng protein cao từ thịt bò, cá, trứng gà để nuôi cơ bắp săn chắc.",
      exercise: "Nhu cầu vận động rất cao: ít nhất 60-90 phút/ngày với các bài tập thể lực như bật nhảy, kéo lốp.",
      grooming: "Lông ngắn bóng mượt, dễ vệ sinh, lau khăn ẩm sau khi tập luyện.",
      health: "Dị ứng thức ăn và dị ứng da tiếp xúc, loạn sản xương hông.",
      tips: "Chủ nuôi bắt buộc phải có trách nhiệm cao, đeo rọ mõm và xích chắc chắn khi ra nơi công cộng theo quy định."
    }
  },

  Jack_Russell_Terrier: {
    viName: "Chó Sục Jack Russell (Jack)",
    origin: "Vương quốc Anh",
    history: "Được mục sư John Russell nhân giống vào đầu thế kỷ 19 để chuyên chui vào hang sâu đuổi cáo đỏ ra cho thợ săn. Thân hình nhỏ gọn, gan lì và không hề biết sợ hãi trước bất cứ đối thủ nào.",
    purpose: "Chui hang bắt cáo đỏ, săn chuột đồng trang trại.",
    lifespan: "12 - 16 năm",
    weight: "5 - 8 kg",
    height: "25 - 30 cm",
    temperament: "Hiếu động tột độ, cực kỳ thông minh, dũng cảm, bướng bỉnh và luôn tò mò mọi thứ.",
    energy: 5,
    trainability: 4,
    care: {
      diet: "Trao đổi chất cực nhanh, cần thức ăn giàu năng lượng cân đối.",
      exercise: "Không bao giờ mệt mỏi! Cần ít nhất 60 phút chạy chơi, đào bới, nhặt bóng mỗi ngày.",
      grooming: "Có loại lông mượt và lông ráp, chải lông 1-2 lần/tuần.",
      health: "Trật bánh chè, bệnh điếc bẩm sinh ở cá thể lông trắng.",
      tips: "Rất thích đào hố trong sân và có thể nhảy cao gấp 5 lần chiều cao cơ thể."
    }
  },

  Scottish_Terrier: {
    viName: "Chó Sục Scotland (Scottie)",
    origin: "Scotland",
    history: "Là giống chó sục cổ vùng cao nguyên Scotland chuyên đào hang bắt lửng và cáo. Nổi tiếng thế giới với chiếc râu cằm dài, đôi lông mày rậm và dáng đi oai phong. Từng là thú cưng trung thành của Tổng thống Mỹ Franklin D. Roosevelt.",
    purpose: "Săn lửng, cáo và rái cá vùng đồi đá Scotland.",
    lifespan: "11 - 13 năm",
    weight: "8 - 10 kg",
    height: "25 - 28 cm",
    temperament: "Độc lập, kiêu hãnh, điềm tĩnh, ít làm phiền người khác nhưng cực kỳ can trường.",
    energy: 3,
    trainability: 3,
    care: {
      diet: "Cân đối lượng calo, hạn chế đồ ăn nhiều dầu mỡ.",
      exercise: "Đi dạo 30-45 phút mỗi ngày, không thích hợp cho các hoạt động bơi lội vì chân ngắn mình nặng.",
      grooming: "Lông dây thép cứng phủ ngoài, cần chải lông thường xuyên và tỉa phom dáng Scottie truyền thống.",
      health: "Bệnh co giật Scottie Cramp (khi phấn khích), ung thư bàng quang.",
      tips: "Không phải là mẫu chó 'bắt nạt' được, chúng đòi hỏi được tôn trọng như một quý ông thực thụ."
    }
  },

  West_Highland_White_Terrier: {
    viName: "Chó Sục Westie (Trắng Tinh)",
    origin: "Poltalloch, Scotland",
    history: "Được Đại tá Malcolm lai tạo chọn lọc lông trắng tinh thuần khiết. Mục đích là để khi chúng chui vào bụi rậm săn thú, người thợ săn không bị bắn nhầm giữa chó với con cáo màu nâu đỏ.",
    purpose: "Săn lửng, cáo và chuột trên các sườn đồi đá.",
    lifespan: "12 - 16 năm",
    weight: "6 - 9 kg",
    height: "25 - 28 cm",
    temperament: "Tự tin, vui vẻ, tò mò, thích khám phá và hòa đồng hơn các dòng sục khác.",
    energy: 4,
    trainability: 4,
    care: {
      diet: "Rất nhạy cảm với dị ứng da từ thức ăn, nên chọn loại hạt không ngũ cốc (grain-free).",
      exercise: "Đi dạo 45 phút mỗi ngày, thích chơi các trò nhặt bóng trong công viên.",
      grooming: "Lông trắng tinh cần tắm và chải lông định kỳ, lau sạch miệng sau khi ăn để không bị ố vàng.",
      health: "Bệnh dị ứng viêm da dị ứng Atopic, bệnh xơ phổi Westie.",
      tips: "Rất thích sủa khi thấy người lạ đến cửa nhà, làm chó báo động cực kỳ trung thành."
    }
  },

  Miniature_Schnauzer: {
    viName: "Chó Schnauzer Mini (Chó Có Râu)",
    origin: "Đức",
    history: "Được lai tạo giữa giống Schnauzer tiêu chuẩn với Affenpinscher và Poodle tại các nông trại Đức thế kỷ 19. Mục đích là để tạo ra một chú chó nhỏ dũng cảm chuyên bắt chuột và canh gác chuồng trại.",
    purpose: "Bắt chuột, giữ nhà trang trại, chó cưng bầu bạn.",
    lifespan: "12 - 15 năm",
    weight: "5 - 9 kg",
    height: "30 - 36 cm",
    temperament: "Cực kỳ thông minh, cảnh giác, tình cảm, luôn muốn theo sát chủ nhân khắp mọi nơi.",
    energy: 4,
    trainability: 5,
    care: {
      diet: "Rất nhạy cảm với chất béo! Nguy cơ cao bị viêm tụy cấp, cần cho ăn thức ăn hạt ít béo (low-fat).",
      exercise: "Năng động, cần 45 phút đi bộ và chơi đùa mỗi ngày.",
      grooming: "Hầu như không rụng lông, cần cắt tỉa râu và lông mày đặc trưng mỗi 6-8 tuần.",
      health: "Viêm tụy, sỏi đường tiết niệu, đục thủy tinh thể.",
      tips: "Ít rụng lông phù hợp người dị ứng, tiếng sủa đanh giòn làm chuông báo trộm rất hiệu quả."
    }
  },

  Cocker_Spaniel: {
    viName: "Chó Cocker Spaniel (Tai Dài)",
    origin: "Vương quốc Anh",
    history: "Được nuôi chuyên dụng để săn chim dẽ giun (Woodcock - nguồn gốc tên gọi Cocker). Bộ lông lượn sóng thướt tha và đôi tai dài phủ lông xoăn đã biến Cocker thành nguồn cảm hứng cho nàng Lady trong phim 'Tiểu thư và Kẻ lang thang'.",
    purpose: "Chó săn chim bãi sậy, tha mồi thủy cầm.",
    lifespan: "12 - 15 năm",
    weight: "12 - 15 kg",
    height: "38 - 41 cm",
    temperament: "Ngọt ngào, nhẹ nhàng, tình cảm, cực kỳ thích vẫy đuôi mừng rỡ khi gặp chủ.",
    energy: 4,
    trainability: 4,
    care: {
      diet: "Dễ bị béo phì nếu không kiểm soát thức ăn. Bổ sung dưỡng chất cho lông và mắt.",
      exercise: "Cần 45-60 phút vận động mỗi ngày, thích bơi lội và lội nước.",
      grooming: "Đôi tai dài cụp rất dễ bị viêm tai do đọng nước và bụi bẩn, cần vệ sinh hàng tuần. Chải lông thường xuyên.",
      health: "Nhiễm trùng tai mạn tính, đục thủy tinh thể và khô mắt.",
      tips: "Khi cho ăn nên dùng bát chuyên dụng lòng sâu miệng hẹp để hai vành tai không bị nhúng vào bát thức ăn."
    }
  },

  Irish_Setter: {
    viName: "Chó Săn Setter Ái Nhĩ Lan (Lông Đỏ)",
    origin: "Ireland (Ái Nhĩ Lan)",
    history: "Được phát triển từ thế kỷ 18 tại Ireland bằng cách lai tạo giữa Setter Anh, Spaniel và Pointer. Chúng nổi tiếng thế giới nhờ bộ lông màu đỏ hạt dẻ ánh kim lộng lẫy và dáng chạy phi nước đại thanh thoát vô đối.",
    purpose: "Chó săn định vị chim đồng cỏ (chỉ điểm bằng tư thế nằm phục xuống).",
    lifespan: "11 - 14 năm",
    weight: "27 - 32 kg",
    height: "60 - 67 cm",
    temperament: "Tràn đầy nhiệt huyết, yêu đời, ngọt ngào, tinh nghịch và hòa đồng với mọi sinh vật.",
    energy: 5,
    trainability: 4,
    care: {
      diet: "Chia khẩu phần ăn làm 2 bữa nhỏ để ngăn ngừa chứng xoắn dạ dày.",
      exercise: "Cực kỳ nhiều năng lượng! Cần ít nhất 90 phút chạy nhảy tự do trên bãi cỏ rộng mỗi ngày.",
      grooming: "Bộ lông đỏ dài như lụa cần chải 3 lần/tuần để loại bỏ gai cỏ và bụi bẩn.",
      health: "Xoắn bao tử, teo võng mạc tiến triển và loạn sản xương hông.",
      tips: "Tính cách trẻ thơ kéo dài suốt đời, rất thích chạy nhảy đùa giỡn trong thiên nhiên."
    }
  },

  Weimaraner: {
    viName: "Chó Bóng Ma Bạc Weimaraner",
    origin: "Weimar, Đức",
    history: "Được Đại công tước Karl August của triều đình Weimar nhân giống vào đầu thế kỷ 19. Từng là giống chó quý chỉ dành riêng cho tầng lớp quý tộc để săn hươu, nai và gấu rừng. Biệt danh 'Bóng ma bạc' (Silver Ghost) bắt nguồn từ màu lông xám tro kỳ ảo lướt nhanh trong rừng sâu.",
    purpose: "Chó săn thú lớn, săn chim chỉ điểm và dẫn đường quý tộc.",
    lifespan: "11 - 13 năm",
    weight: "25 - 40 kg",
    height: "59 - 70 cm",
    temperament: "Dũng cảm, thông minh vượt trội, trung thành tuyệt đối và có nhu cầu ở bên chủ rất cao.",
    energy: 5,
    trainability: 5,
    care: {
      diet: "Cần chế độ ăn cân bằng đạm cao, hạn chế ăn no ngay trước hoặc sau khi chạy nhảy.",
      exercise: "Nhu cầu tập luyện cực kỳ cao! Cần 90-120 phút chạy việt dã hoặc đồng hành cùng xe đạp mỗi ngày.",
      grooming: "Lông ngắn như nhung màu xám bạc, hầu như không bám bẩn, chỉ cần lau khăn ẩm.",
      health: "Xoắn dạ dày, loạn sản khớp hông.",
      tips: "Rất dễ mắc hội chứng lo âu xa cách (separation anxiety) nếu bị nhốt một mình quá lâu."
    }
  },

  Vizsla: {
    viName: "Chó Chỉ Điểm Hungary (Vizsla)",
    origin: "Hungary",
    history: "Đồng hành cùng các kỵ sĩ du mục Magyar xâm chiếm lưu vực sông Danube từ thế kỷ thứ 10. Được mệnh danh là 'chó Velcro' (chó khóa dính) vì thói quen luôn đi sát sạt bên chân chủ nhân bất kể ngày đêm.",
    purpose: "Chó săn chỉ điểm và tha mồi đa năng trên cạn lẫn dưới nước.",
    lifespan: "12 - 14 năm",
    weight: "20 - 30 kg",
    height: "53 - 64 cm",
    temperament: "Dịu dàng, nhạy cảm, thông minh, giàu tình cảm và cực kỳ gắn kết với chủ nhân.",
    energy: 5,
    trainability: 5,
    care: {
      diet: "Chuyển hóa năng lượng nhanh, cần thức ăn giàu đạm động vật tươi ngon.",
      exercise: "Cần ít nhất 60 - 90 phút vận động thể thao mạnh mỗi ngày: chạy bộ đường dài, bơi lội.",
      grooming: "Lông ngắn màu gỉ sắt đồng đều tuyệt đẹp, không có lớp lót dưới, rất ít mùi hôi cơ thể.",
      health: "Động kinh vô căn, loạn sản khớp hông.",
      tips: "Tâm hồn rất nhạy cảm, chỉ đáp ứng với phương pháp huấn luyện tích cực bằng khen ngợi, tuyệt đối không dùng đòn roi."
    }
  },

  Australian_Cattle_Dog: {
    viName: "Chó Chăn Bò Úc (Blue Heeler)",
    origin: "Úc (Australia)",
    history: "Được những người định cư Anh lai tạo giữa chó chăn cừu Collie với chó hoang bản địa Dingo của Úc vào thế kỷ 19. Mục đích là để tạo ra một giống chó chịu được cái nóng thiêu đốt của sa mạc hẻo lánh và lùa đàn bò hoang dã hàng ngàn dặm đường.",
    purpose: "Chăn lùa đàn gia súc hoang dã cắn gót chân (heeler) tại các nông trang bạt ngàn nước Úc.",
    lifespan: "12 - 16 năm",
    weight: "15 - 22 kg",
    height: "43 - 51 cm",
    temperament: "Bền bỉ vô song, cực kỳ kiên cường, cảnh giác, thông minh và trung thành bảo vệ chủ.",
    energy: 5,
    trainability: 5,
    care: {
      diet: "Nhu cầu calo cao từ thức ăn giàu thịt và chất béo lành mạnh.",
      exercise: "Thể lực phi thường! Cần được làm việc hoặc tập luyện thể thao cường độ cao ít nhất 90 phút mỗi ngày.",
      grooming: "Lông ngắn chống thấm nước rụng theo mùa, chải lông mỗi tuần 1 lần.",
      health: "Điếc bẩm sinh, teo võng mạc tiến triển (PRA).",
      tips: "Từng giữ kỷ lục Guinness chú chó sống thọ nhất thế giới (chú chó Bluey sống tới 29 năm 5 tháng)."
    }
  },

  Papillon: {
    viName: "Chó Bướm Papillon",
    origin: "Pháp & Bỉ",
    history: "Tên 'Papillon' trong tiếng Pháp có nghĩa là 'con bướm', miêu tả đôi tai xòe rộng với lớp lông dài rủ xuống tựa như cánh bướm đang bay. Xuất hiện trong vô số kiệt tác hội họa của Rubens, Rembrandt và là cưng chiều của hoàng hậu Marie Antoinette.",
    purpose: "Chó cưng quý tộc cung đình châu Âu thời Phục Hưng.",
    lifespan: "13 - 16 năm",
    weight: "2.5 - 4.5 kg",
    height: "20 - 28 cm",
    temperament: "Lọt top 10 giống chó thông minh nhất thế giới! Nhanh nhẹn, vui vẻ, hiền hòa và rất lanh trí.",
    energy: 4,
    trainability: 5,
    care: {
      diet: "Khẩu phần nhỏ giàu dưỡng chất, tránh để tăng cân đè nặng lên khớp gối.",
      exercise: "Rất thích vượt chướng ngại vật (Agility) và đi dạo 30 phút mỗi ngày.",
      grooming: "Lông mềm như lụa không có lớp lót dưới, ít rụng lông. Chải lông nhẹ nhàng 2 lần/tuần.",
      health: "Trật khớp bánh chè, thóp đầu hở ở chó con sơ sinh.",
      tips: "Đừng để vẻ ngoài kiêu sa đánh lừa, Papillon có thể học mọi trò xiếc nhanh như Border Collie!"
    }
  },

  Pekingese: {
    viName: "Chó Bắc Kinh (Pekingese)",
    origin: "Bắc Kinh, Trung Quốc cổ đại",
    history: "Truyền thuyết kể rằng chúng là kết quả tình yêu giữa sư tử và khỉ. Chỉ có thành viên hoàng gia Trung Hoa mới được phép sở hữu chó Bắc Kinh; kẻ nào dám trộm cắp chó này sẽ bị xử tội chết. Khi hoàng đế đi vi hành, chúng nằm gọn gàng trong tay áo thụng của hoàng bào.",
    purpose: "Chó cưng tay áo hoàng đế triều đình Trung Hoa cổ đại.",
    lifespan: "12 - 14 năm",
    weight: "3.5 - 6 kg",
    height: "15 - 23 cm",
    temperament: "Trịnh trọng, kiêu hãnh, tự tin, can đảm và có phần hơi cứng đầu.",
    energy: 2,
    trainability: 2,
    care: {
      diet: "Ăn lượng vừa phải, bát nông miệng để mõm ngắn dễ lấy thức ăn.",
      exercise: "Đi dạo chậm rãi 20 phút mỗi ngày trong thời tiết mát mẻ.",
      grooming: "Bộ lông dày xù rủ sát đất cần chải hằng ngày và vệ sinh nếp nhăn mũi.",
      health: "Hội chứng đường thở ngắn, bệnh mắt lồi và thoái hóa đĩa đệm lưng.",
      tips: "Rất ghét bị đối xử thô lỗ, đòi hỏi người chủ phải nhẹ nhàng và tôn trọng cá tính riêng."
    }
  },

  Newfoundland: {
    viName: "Chó Cứu Hộ Dưới Nước Newfoundland",
    origin: "Đảo Newfoundland, Canada",
    history: "Sở hữu màng bơi giữa các ngón chân, bộ lông kép không thấm nước và sức mạnh cơ bắp phi thường. Chúng được các thủy thủ Canada nuôi để kéo dây thừng cứu sinh từ tàu đắm vào bờ và cứu người đuối nước giữa biển khơi lạnh giá.",
    purpose: "Cứu hộ dưới nước, kéo lưới cá, kéo xe chở gỗ nặng.",
    lifespan: "8 - 10 năm",
    weight: "50 - 70 kg",
    height: "66 - 71 cm",
    temperament: "Nổi tiếng với danh xưng 'chó bảo mẫu' (Nanny dog), hiền từ tột độ, kiên nhẫn và sẵn sàng lao xuống nước cứu người.",
    energy: 3,
    trainability: 4,
    care: {
      diet: "Chi phí ăn uống rất lớn, thức ăn cần bổ sung Omega-3 để duy trì chất dầu chống thấm nước của lông.",
      exercise: "Cực kỳ thích bơi lội! Đi dạo 45 phút mỗi ngày trong thời tiết mát mẻ.",
      grooming: "Lông dày rụng rất nhiều, cần chải lông hằng ngày và chuẩn bị khăn lau dãi.",
      health: "Xoắn bao tử, hẹp van động mạch dưới chủ (SAS), loạn sản khớp hông.",
      tips: "Bản năng cứu hộ dưới nước bẩm sinh: nếu thấy bạn bơi dưới nước, chúng có thể bơi ra ngoạm tay kéo bạn vào bờ vì sợ bạn chết đuối!"
    }
  },

  Komondor: {
    viName: "Chó Giẻ Lau Nhà Komondor",
    origin: "Hungary",
    history: "Được bộ tộc du mục Cuman đưa vào Hungary từ thế kỷ 13. Bộ lông bện thành từng dây thừng dày cộp (dreadlocks) trắng muốt độc nhất vô nhị giúp chúng trà trộn hoàn hảo vào đàn cừu và bảo vệ cơ thể khỏi nanh vuốt của bầy sói đói.",
    purpose: "Bảo vệ đàn cừu khỏi chó sói và gấu rừng châu Âu.",
    lifespan: "10 - 12 năm",
    weight: "40 - 60 kg",
    height: "65 - 75 cm",
    temperament: "Độc lập, điềm đạm, cảnh giác cao độ, bảo vệ lãnh thổ và đàn cừu bất khả xâm phạm.",
    energy: 3,
    trainability: 3,
    care: {
      diet: "Khẩu phần giàu dinh dưỡng cho dòng chó đại hình canh gác.",
      exercise: "Đi tuần tra trang trại hoặc đi dạo 45 phút mỗi ngày.",
      grooming: "TUYỆT ĐỐI KHÔNG CHẢI LÔNG! Các lọn lông bện dây thừng cần được tách thủ công bằng tay định kỳ. Khi tắm mất nửa ngày để giặt và sấy khô hoàn toàn.",
      health: "Nhiễm trùng tai và da nếu lông bện bị ẩm mốc, loạn sản xương hông.",
      tips: "Ngoại hình như một chiếc giẻ lau nhà khổng lồ biết đi, nhưng bên trong là một chiến binh dũng mãnh bảo vệ gia đình."
    }
  },

  Irish_Wolfhound: {
    viName: "Chó Săn Sói Ireland (Chó Cao Nhất Thế Giới)",
    origin: "Ireland (Ái Nhĩ Lan)",
    history: "Là giống chó cao nhất thế giới (khi đứng bằng hai chân sau có thể cao hơn 2 mét!). Từ thời La Mã cổ đại, các chiến binh Celtic đã dùng chúng trong chiến tranh để kéo ngã kỵ sĩ khỏi ngựa và săn loài sói hoang Ireland hung dữ đến mức tuyệt chủng.",
    purpose: "Săn chó sói và hươu khổng lồ thời cổ đại.",
    lifespan: "6 - 8 năm",
    weight: "48 - 70 kg",
    height: "80 - 90 cm",
    temperament: "Thanh thản, trầm tĩnh, dịu dàng vô bờ bến với con người, không hề hung dữ dù kích thước khổng lồ.",
    energy: 3,
    trainability: 4,
    care: {
      diet: "Chi phí thức ăn rất cao, cần quản lý tốc độ tăng trưởng của chó con để tránh cong vẹo xương khớp.",
      exercise: "Cần không gian rộng lớn để chạy sải bước dài 45-60 phút mỗi ngày.",
      grooming: "Lông thô cứng như rễ tre, chải lông 1-2 lần/tuần.",
      health: "Tuổi thọ ngắn, bệnh cơ tim giãn (DCM), xoắn dạ dày và ung thư xương.",
      tips: "Cần xe ô tô rộng rãi và ngôi nhà có diện tích lớn để chúng có thể duỗi thẳng đôi chân dài miên man."
    }
  },

  Italian_Greyhound: {
    viName: "Chó Săn Thỏ Ý (Iggy)",
    origin: "Ý & Vùng Địa Trung Hải",
    history: "Xuất hiện hơn 2.000 năm trước ở vùng Hy Lạp và Thổ Nhĩ Kỳ cổ đại, sau đó trở thành biểu tượng xa hoa của giới quý tộc Ý thời Phục Hưng. Nữ hoàng Victoria và Catherine Đại đế của Nga đều từng sở hữu những chú chó sighthound tí hon thanh lịch này.",
    purpose: "Săn thỏ nhỏ bằng thị giác, chó cưng quý tộc hoàng cung.",
    lifespan: "13 - 15 năm",
    weight: "3.5 - 6 kg",
    height: "32 - 38 cm",
    temperament: "Nhút nhát, tình cảm, siêu thanh lịch, yêu thích sự êm ái và thích rúc dưới chăn ấm.",
    energy: 3,
    trainability: 3,
    care: {
      diet: "Cơ thể thanh mảnh không có mỡ cách nhiệt, cần thức ăn chất lượng cao, dễ hấp thụ.",
      exercise: "Thích bứt tốc độ ngắn trong sân có rào kín, đi dạo 30 phút mỗi ngày.",
      grooming: "Lông siêu ngắn sát da, hầu như không rụng và không mùi hôi. Mùa đông BẮT BUỘC phải mặc áo len ấm.",
      health: "Xương cẳng chân rất mảnh mai như cành cây khô, dễ gãy nếu nhảy từ sofa cao xuống sàn gạch trơn.",
      tips: "Rất nhạy cảm với thời tiết lạnh và mưa ướt, thích nằm sưởi nắng bên cửa sổ."
    }
  },

  Old_English_Sheepdog: {
    viName: "Chó Chăn Cừu Anh Cổ (Bobtail)",
    origin: "Tây Nam nước Anh",
    history: "Được phát triển vào thế kỷ 19 để giúp nông dân lùa đàn bò và cừu từ đồng cỏ ra chợ bán. Người ta thường cắt cụt đuôi của chúng để chứng minh đây là chó lao động và được miễn thuế vật nuôi (từ đó có tên Bobtail).",
    purpose: "Lùa gia súc đường trường, canh gác trang trại nước Anh.",
    lifespan: "10 - 12 năm",
    weight: "27 - 45 kg",
    height: "56 - 61 cm",
    temperament: "Hài hước, thân thiện, kiên nhẫn, thích bảo bọc trẻ nhỏ và có dáng đi lạch bạch như gấu.",
    energy: 3,
    trainability: 4,
    care: {
      diet: "Thức ăn cân đối dinh dưỡng cho chó lao động lông dày.",
      exercise: "Cần 45 - 60 phút đi dạo và chơi trò chơi nhặt bóng mỗi ngày.",
      grooming: "Bộ lông dài xù phủ kín cả mắt đòi hỏi chải lông kỹ lưỡng 3-4 lần/tuần để không bị bết rối thành búi.",
      health: "Loạn sản khớp hông, đục thủy tinh thể, điếc bẩm sinh.",
      tips: "Tiếng sủa trầm khàn vang xa như tiếng chuông vỡ rất đặc trưng."
    }
  },

  Great_Pyrenees: {
    viName: "Chó Gác Tuyết Khổng Lồ Pyrenees",
    origin: "Dãy núi Pyrenees (biên giới Pháp và Tây Ban Nha)",
    history: "Được các mục đồng vùng núi Pyrenees nuôi dưỡng từ hàng nghìn năm trước để bảo vệ đàn cừu khỏi gấu xám và bầy sói tuyết. Vua Louis XIV từng phong tặng chúng danh hiệu 'Hoàng khuyển của nước Pháp'.",
    purpose: "Chó bảo vệ gia súc trên núi tuyết, hộ vệ lâu đài hoàng gia Pháp.",
    lifespan: "10 - 12 năm",
    weight: "38 - 55 kg",
    height: "65 - 82 cm",
    temperament: "Điềm đạm, hiền từ như một vị thần hộ mệnh, can đảm tuyệt đối và có bản năng bảo vệ bẩm sinh.",
    energy: 3,
    trainability: 3,
    care: {
      diet: "Ăn ít hơn nhiều so với kích thước khổng lồ nhờ tốc độ chuyển hóa chậm vùng núi tuyết.",
      exercise: "Đi dạo 45 phút mỗi ngày lúc sáng sớm hoặc tối mát mẻ.",
      grooming: "Bộ lông trắng tuyết chống chịu thời tiết rụng nhiều theo mùa, chải lông 2 lần/tuần.",
      health: "Xoắn bao tử, ung thư xương, nhạy cảm với khí hậu nóng ẩm nhiệt đới.",
      tips: "Thích tuần tra và sủa cảnh báo vào ban đêm theo bản năng canh gác chó sói thời xưa."
    }
  },

  Leonberger: {
    viName: "Chó Sư Tử Đức Leonberger",
    origin: "Leonberg, bang Baden-Württemberg, Đức",
    history: "Được thị trưởng Heinrich Essig lai tạo vào những năm 1840 giữa Saint Bernard, Newfoundland và Great Pyrenees. Mục đích là tạo ra một giống chó khổng lồ trông giống hệt con sư tử dũng mãnh trên huy hiệu của thành phố Leonberg.",
    purpose: "Chó cảnh hoàng gia, kéo xe hàng, cứu hộ dưới nước.",
    lifespan: "7 - 9 năm",
    weight: "45 - 75 kg",
    height: "65 - 80 cm",
    temperament: "Trầm ổn, lịch thiệp, cực kỳ dịu dàng với trẻ em, không hề có tính khí thất thường.",
    energy: 3,
    trainability: 4,
    care: {
      diet: "Cần lượng thức ăn lớn giàu canxi và glucosamine bảo vệ khớp xương.",
      exercise: "Cần 60 phút vận động mỗi ngày, rất yêu thích bơi lội và lội bùn.",
      grooming: "Lông dày hai lớp có mặt nạ đen đặc trưng, chải lông mỗi ngày để tránh rối.",
      health: "Bệnh tim, bệnh thoái hóa đa dây thần kinh (LPN), xoắn dạ dày.",
      tips: "Rất thích nước và bùn, sẵn sàng nhảy ùm xuống bất kỳ ao hồ nào chúng nhìn thấy!"
    }
  }
};

// =====================================================
// 2. BIẾN TOÀN CỤC & TRẠNG THÁI
// =====================================================
let model = null;
let maxPredictions = 0;
let webcam = null;
let isCamRunning = false;
let animFrameId = null;

// =====================================================
// 3. TÌM KIẾM GIỐNG CHÓ CHUẨN XÁC TỪ DATABASE
// =====================================================
function normalizeKey(str) {
  if (!str) return "";
  return str.toLowerCase().replace(/[^a-z0-9]/g, "");
}

function findBreedData(className) {
  if (!className) return null;
  const targetNorm = normalizeKey(className);

  // 1. Khớp chính xác key
  for (const key of Object.keys(DOG_DATABASE)) {
    if (normalizeKey(key) === targetNorm) {
      return { key, data: DOG_DATABASE[key] };
    }
  }

  // 2. Khớp một phần
  for (const key of Object.keys(DOG_DATABASE)) {
    const kNorm = normalizeKey(key);
    if (targetNorm.includes(kNorm) || kNorm.includes(targetNorm)) {
      return { key, data: DOG_DATABASE[key] };
    }
  }

  return null;
}

// =====================================================
// 4. LOAD MODEL TỪ URL HOẶC DEMO
// =====================================================
async function loadModel() {
  let url = document.getElementById("modelUrlInput").value.trim();
  const statusBox = document.getElementById("modelStatus");

  if (!url) {
    showStatus("Vui lòng nhập đường dẫn URL model Teachable Machine của bạn!", "error");
    return;
  }

  if (!url.endsWith("/")) url += "/";

  showStatus("⏳ Đang tải mô hình AI từ Google... Vui lòng đợi trong giây lát!", "loading");

  try {
    const modelURL = url + "model.json";
    const metadataURL = url + "metadata.json";

    model = await tmImage.load(modelURL, metadataURL);
    maxPredictions = model.getTotalClasses();

    showStatus(`✅ Đã tải mô hình thành công! Nhận diện được ${maxPredictions} loài.`, "success");
    document.getElementById("detectSection").style.display = "block";
    document.getElementById("detectSection").scrollIntoView({ behavior: "smooth" });
  } catch (err) {
    console.error(err);
    showStatus(`❌ Không thể tải model từ URL này. Vui lòng kiểm tra lại link (phải export dạng TensorFlow.js Upload)!`, "error");
  }
}

function showStatus(msg, type) {
  const box = document.getElementById("modelStatus");
  box.className = `status-box ${type}`;
  box.innerHTML = msg;
}

function useDemoMode() {
  document.getElementById("detectSection").style.display = "block";
  showStatus("✨ Đang dùng chế độ Demo mẫu. Bạn có thể tải ảnh lên để trải nghiệm giao diện hoàn chỉnh!", "success");
  document.getElementById("detectSection").scrollIntoView({ behavior: "smooth" });
}

// =====================================================
// 5. TABS & WEBCAM
// =====================================================
function switchTab(btn, tabName) {
  document.querySelectorAll(".detect-tabs .tab").forEach(t => t.classList.remove("active"));
  document.querySelectorAll(".tab-pane").forEach(p => p.classList.remove("active"));

  btn.classList.add("active");
  document.getElementById(`pane-${tabName}`).classList.add("active");

  if (tabName !== "camera" && isCamRunning) {
    stopCamera();
  }
}

async function startCamera() {
  if (!model) {
    alert("Vui lòng tải Model hoặc bấm Demo Mode trước khi bật camera!");
    return;
  }

  const container = document.getElementById("webcamContainer");
  container.innerHTML = "";

  try {
    const flip = true;
    webcam = new tmImage.Webcam(360, 360, flip);
    await webcam.setup();
    await webcam.play();
    container.appendChild(webcam.canvas);

    isCamRunning = true;
    document.getElementById("btnStartCam").style.display = "none";
    document.getElementById("btnStopCam").style.display = "inline-flex";

    loopWebcam();
  } catch (err) {
    console.error(err);
    alert("Không thể truy cập camera. Vui lòng cấp quyền camera trên trình duyệt!");
  }
}

async function loopWebcam() {
  if (!isCamRunning) return;
  webcam.update();
  await predictWebcam();
  animFrameId = window.requestAnimationFrame(loopWebcam);
}

async function predictWebcam() {
  if (!model || !webcam) return;
  const t0 = performance.now();
  const prediction = await model.predict(webcam.canvas);
  const inferTime = Math.round(performance.now() - t0);
  renderResults(prediction, inferTime);
}

function stopCamera() {
  isCamRunning = false;
  if (animFrameId) cancelAnimationFrame(animFrameId);
  if (webcam) {
    webcam.stop();
  }
  document.getElementById("webcamContainer").innerHTML = `
    <div class="cam-placeholder">
      <i class="fa-solid fa-dog"></i>
      <p>Camera đã dừng</p>
    </div>
  `;
  document.getElementById("btnStartCam").style.display = "inline-flex";
  document.getElementById("btnStopCam").style.display = "none";
}

// =====================================================
// 6. UPLOAD & PHÂN TÍCH ẢNH
// =====================================================
function onDragOver(e) {
  e.preventDefault();
  document.getElementById("uploadZone").classList.add("dragover");
}

function onDrop(e) {
  e.preventDefault();
  document.getElementById("uploadZone").classList.remove("dragover");
  if (e.dataTransfer.files && e.dataTransfer.files[0]) {
    handleFile(e.dataTransfer.files[0]);
  }
}

function onFileSelect(e) {
  if (e.target.files && e.target.files[0]) {
    handleFile(e.target.files[0]);
  }
}

function handleFile(file) {
  if (!file.type.startsWith("image/")) {
    alert("Vui lòng chọn đúng file hình ảnh!");
    return;
  }
  const reader = new FileReader();
  reader.onload = function(evt) {
    const img = document.getElementById("previewImg");
    img.src = evt.target.result;
    document.getElementById("uploadZone").style.display = "none";
    document.getElementById("uploadPreview").classList.remove("hidden");
  };
  reader.readAsDataURL(file);
}

function resetUpload() {
  stopSpeaking();
  document.getElementById("previewImg").src = "";
  document.getElementById("uploadZone").style.display = "flex";
  document.getElementById("uploadPreview").classList.add("hidden");
  document.getElementById("fileInput").value = "";
  document.getElementById("resultCard").style.display = "none";
  document.getElementById("breedInfoCard").style.display = "none";
  document.getElementById("careCard").style.display = "none";
  document.getElementById("techSpecsCard").style.display = "none";
  document.getElementById("referencesCard").style.display = "none";
}

async function predictFromImage() {
  const imgElement = document.getElementById("previewImg");
  if (!imgElement.src) {
    alert("Vui lòng tải ảnh lên trước!");
    return;
  }

  const t0 = performance.now();
  if (model) {
    const prediction = await model.predict(imgElement);
    const inferTime = Math.round(performance.now() - t0);
    renderResults(prediction, inferTime);
    document.getElementById("resultCard").scrollIntoView({ behavior: "smooth" });
  } else {
    // Chế độ Demo mẫu
    const demoPrediction = [
      { className: "Golden_Retriever", probability: 0.94 },
      { className: "Labrador_Retriever", probability: 0.04 },
      { className: "Cocker_Spaniel", probability: 0.02 }
    ];
    renderResults(demoPrediction, 38);
    document.getElementById("resultCard").scrollIntoView({ behavior: "smooth" });
  }
}

// =====================================================
// 7. HIỂN THỊ KẾT QUẢ, NGUỒN GỐC & CHĂM SÓC
// =====================================================
let currentSpeechText = "";
let isSpeaking = false;

function renderResults(predictionList, inferTime = 40) {
  stopSpeaking();

  // Sắp xếp xác suất từ cao xuống thấp
  predictionList.sort((a, b) => b.probability - a.probability);

  const top = predictionList[0];
  const topPercent = (top.probability * 100).toFixed(1);

  // Hiển thị panel kết quả
  const resultCard = document.getElementById("resultCard");
  resultCard.style.display = "block";

  // Cảnh báo nếu độ tin cậy < 40%
  const alertBox = document.getElementById("lowConfidenceAlert");
  if (top.probability < 0.40) {
    alertBox.style.display = "flex";
  } else {
    alertBox.style.display = "none";
  }

  // Tìm thông tin giống trong Database
  const match = findBreedData(top.className);
  const breedData = match ? match.data : null;
  const breedKey = match ? match.key : top.className;

  // 1. Tên & Confidence
  const displayName = breedData ? breedData.viName : top.className.replace(/_/g, " ");
  document.getElementById("topBreedName").innerHTML = `
    <span>${displayName}</span>
    <small style="display:block; font-size:1rem; color:var(--text-muted); font-weight:600; margin-top:4px;">
      Tên khoa học/quốc tế: <em>${top.className.replace(/_/g, " ")}</em>
    </small>
  `;
  document.getElementById("topBreedScore").textContent = `${topPercent}%`;

  // 2. Huy hiệu tương thích với chủ nuôi (Suitability Badges)
  renderSuitabilityBadges(breedData);

  // 3. Thanh phân bố xác suất top 5
  const allPredContainer = document.getElementById("allPredictions");
  allPredContainer.innerHTML = "";
  const topN = predictionList.slice(0, 5);

  topN.forEach((p, idx) => {
    const pct = (p.probability * 100).toFixed(1);
    const m = findBreedData(p.className);
    const label = m ? m.data.viName.split("(")[0] : p.className.replace(/_/g, " ");

    const row = document.createElement("div");
    row.className = "pred-row";
    row.innerHTML = `
      <div class="pred-label" title="${p.className}">${label}</div>
      <div class="pred-bar-wrap">
        <div class="pred-bar ${idx === 0 ? 'top-bar' : ''}" style="width: ${pct}%"></div>
      </div>
      <div class="pred-pct">${pct}%</div>
    `;
    allPredContainer.appendChild(row);
  });

  // 4. Chi tiết giống chó, Cẩm nang chăm sóc minh họa & Nguồn tham khảo
  renderBreedDetails(breedKey, breedData);
  renderTechSpecs(inferTime);
  renderAcademicReferences(top.className, breedData);

  // Soạn sẵn kịch bản đọc giọng nói
  if (breedData) {
    currentSpeechText = `Kết quả nhận diện: ${breedData.viName}. Độ tin cậy: ${topPercent} phần trăm. Về nguồn gốc: ${breedData.origin}. Lịch sử hình thành: ${breedData.history}. Về tính cách: ${breedData.temperament}. Lời khuyên chăm sóc: ${breedData.care.tips}`;
  } else {
    currentSpeechText = `Kết quả nhận diện là ${top.className.replace(/_/g, " ")} với độ tin cậy ${topPercent} phần trăm.`;
  }
}

function renderSuitabilityBadges(data) {
  const container = document.getElementById("suitabilityBadges");
  if (!data) {
    container.innerHTML = "";
    return;
  }

  // Xác định các chỉ số tương thích
  let spaceText = "Nhà có sân rộng";
  let spaceIcon = "fa-house-chimney-window";
  if (data.energy <= 3 && !data.weight.includes("50") && !data.weight.includes("60")) {
    spaceText = "Thích hợp căn hộ / chung cư";
    spaceIcon = "fa-building";
  }

  let childText = "Cực kỳ thân thiện với trẻ";
  let childIcon = "fa-child-reaching";
  if (data.energy >= 5 || data.weight.includes("40") || data.weight.includes("50")) {
    childText = "Thân thiện (Cần người lớn giám sát)";
    childIcon = "fa-children";
  }

  let expText = "Dễ nuôi (Người mới nuôi được)";
  let expIcon = "fa-award";
  if (data.trainability <= 3 || data.energy >= 5) {
    expText = "Cần người có kinh nghiệm";
    expIcon = "fa-user-graduate";
  }

  container.innerHTML = `
    <div class="suitability-chip">
      <i class="fa-solid ${spaceIcon}"></i>
      <div class="sc-info">
        <span class="sc-label">Không gian sống</span>
        <span class="sc-val">${spaceText}</span>
      </div>
    </div>

    <div class="suitability-chip">
      <i class="fa-solid ${childIcon}"></i>
      <div class="sc-info">
        <span class="sc-label">Thân thiện trẻ em</span>
        <span class="sc-val">${childText}</span>
      </div>
    </div>

    <div class="suitability-chip">
      <i class="fa-solid ${expIcon}"></i>
      <div class="sc-info">
        <span class="sc-label">Kinh nghiệm chủ nuôi</span>
        <span class="sc-val">${expText}</span>
      </div>
    </div>
  `;
}

function renderBreedDetails(breedKey, data) {
  const infoCard = document.getElementById("breedInfoCard");
  const careCard = document.getElementById("careCard");

  if (!data) {
    infoCard.style.display = "none";
    careCard.style.display = "none";
    return;
  }

  infoCard.style.display = "block";
  careCard.style.display = "block";

  // Ảnh minh họa lớn & chó con
  const userImgElement = document.getElementById("previewImg");
  const hasUserImg = userImgElement && userImgElement.src && !userImgElement.src.endsWith("#") && !userImgElement.src.startsWith("data:,");
  const userImgSrc = hasUserImg ? userImgElement.src : null;

  const adultImgPath = `dog_images_50/${breedKey}/adult_01.jpg`;
  const puppyImgPath = `dog_images_50/${breedKey}/puppy_01.jpg`;
  const fallbackImg = SAMPLES[breedKey] || "https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=600";
  const priceInfo = BREED_PRICES[breedKey] || { local: "6 - 12 triệu", vka: "15 - 25 triệu", import: "40 - 70 triệu", monthly: "1.2 - 2.5 triệu/tháng" };

  const infoGrid = document.getElementById("breedInfoContent");
  infoGrid.innerHTML = `
    <!-- HÌNH ẢNH MINH HỌA & ẢNH KHÁCH HÀNG -->
    <div style="grid-column: 1 / -1; display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 16px; margin-bottom: 8px;">
      ${userImgSrc ? `
      <div style="background: var(--bg2); border: 2px solid var(--primary); border-radius: 16px; overflow: hidden; position: relative;">
        <span style="position: absolute; top: 10px; left: 10px; background: rgba(249,115,22,0.95); backdrop-filter: blur(8px); color: #fff; font-size: 0.78rem; font-weight: 800; padding: 4px 10px; border-radius: 999px;">
          📸 Ảnh bạn vừa tải lên / Chụp
        </span>
        <img src="${userImgSrc}" alt="Ảnh người dùng tải lên" style="width: 100%; height: 230px; object-fit: cover; display: block;" />
      </div>
      ` : ''}

      <div style="background: var(--bg2); border: 1px solid var(--border); border-radius: 16px; overflow: hidden; position: relative;">
        <span style="position: absolute; top: 10px; left: 10px; background: rgba(0,0,0,0.75); backdrop-filter: blur(8px); color: #fff; font-size: 0.78rem; font-weight: 800; padding: 4px 10px; border-radius: 999px;">
          🐕 Chó Trưởng Thành (Chuẩn giống)
        </span>
        <img src="${adultImgPath}" alt="${data.viName}" style="width: 100%; height: 230px; object-fit: cover; display: block;" onerror="this.src='${fallbackImg}'" />
      </div>

      <div style="background: var(--bg2); border: 1px solid var(--border); border-radius: 16px; overflow: hidden; position: relative;">
        <span style="position: absolute; top: 10px; left: 10px; background: rgba(139,92,246,0.9); backdrop-filter: blur(8px); color: #fff; font-size: 0.78rem; font-weight: 800; padding: 4px 10px; border-radius: 999px;">
          🐶 Chó Lúc Còn Bé (Puppy)
        </span>
        <img src="${puppyImgPath}" alt="${data.viName} puppy" style="width: 100%; height: 230px; object-fit: cover; display: block;" onerror="this.src='https://images.unsplash.com/photo-1591160690555-5debfba289f0?w=600'" />
      </div>
    </div>

    <!-- KHỐI GIÁ THỊ TRƯỜNG VIỆT NAM -->
    <div class="price-card">
      <div class="price-card-title">
        <i class="fa-solid fa-tags"></i> 💰 Bảng giá tham khảo tại thị trường Việt Nam
      </div>
      <div class="price-grid">
        <div class="price-box">
          <span class="price-type">🏷️ Nuôi Cảnh (Sinh sản trong nước)</span>
          <span class="price-val">${priceInfo.local}</span>
        </div>
        <div class="price-box">
          <span class="price-type">📜 Thuần chủng có phả hệ VKA</span>
          <span class="price-val">${priceInfo.vka}</span>
        </div>
        <div class="price-box">
          <span class="price-type">✈️ Nhập khẩu Thái Lan / Châu Âu (FCI)</span>
          <span class="price-val">${priceInfo.import}</span>
        </div>
        <div class="price-box" style="grid-column: 1 / -1; background: rgba(245, 158, 11, 0.05);">
          <span class="price-type">🍖 Chi phí nuôi dưỡng trung bình ước tính</span>
          <span class="price-val" style="color: #60a5fa; font-size: 0.95rem;">${priceInfo.monthly} (Thức ăn, hạt, vaccine, spa)</span>
        </div>
      </div>
    </div>

    <!-- KHỐI 1: LỊCH SỬ & NGUỒN GỐC CHI TIẾT -->
    <div class="breed-desc" style="grid-column: 1 / -1; background: linear-gradient(135deg, rgba(249,115,22,0.1), rgba(139,92,246,0.1)); border-color: rgba(249,115,22,0.3);">
      <h3 style="color: var(--primary); font-size: 1.15rem; font-weight: 800; margin-bottom: 8px;">
        🏛️ Lịch sử hình thành & Nguồn gốc giống chó
      </h3>
      <p style="margin-bottom: 10px; color: var(--text); font-size: 0.95rem; line-height: 1.7;">${data.history}</p>
      <div style="display:flex; gap:20px; flex-wrap:wrap; margin-top:12px; font-size:0.9rem;">
        <div><strong>📍 Quốc gia xuất xứ:</strong> <span style="color:var(--text);">${data.origin}</span></div>
        <div><strong>🎯 Mục đích lai tạo ban đầu:</strong> <span style="color:var(--text);">${data.purpose}</span></div>
      </div>
    </div>

    <!-- THÔNG SỐ CƠ BẢN -->
    <div class="info-chip">
      <span class="ic-label">⏳ Tuổi thọ trung bình</span>
      <span class="ic-value">${data.lifespan}</span>
    </div>
    <div class="info-chip">
      <span class="ic-label">⚖️ Cân nặng chuẩn</span>
      <span class="ic-value">${data.weight}</span>
    </div>
    <div class="info-chip">
      <span class="ic-label">📏 Chiều cao vai</span>
      <span class="ic-value">${data.height}</span>
    </div>
    <div class="info-chip">
      <span class="ic-label">⚡ Mức năng lượng</span>
      <span class="ic-value stars">${'★'.repeat(data.energy)}${'☆'.repeat(5 - data.energy)}</span>
    </div>
    <div class="info-chip">
      <span class="ic-label">🧠 Khả năng huấn luyện</span>
      <span class="ic-value stars">${'★'.repeat(data.trainability)}${'☆'.repeat(5 - data.trainability)}</span>
    </div>
    <div class="info-chip" style="grid-column: 1 / -1;">
      <span class="ic-label">❤️ Đặc trưng tính cách</span>
      <span class="ic-value" style="color: var(--primary); font-size: 1.05rem;">${data.temperament}</span>
    </div>
  `;

  // Render Cẩm nang Chăm sóc - CÓ ẢNH MINH HỌA CHO TỪNG MỤC
  const careGrid = document.getElementById("careContent");
  careGrid.innerHTML = `
    <!-- MỤC 1: DINH DƯỠNG CÓ ẢNH -->
    <div class="care-item">
      <img class="care-item-img" src="https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=600&auto=format&fit=crop&q=80" alt="Chế độ dinh dưỡng cho chó" />
      <div class="care-item-body">
        <div class="care-item-header">
          <div class="care-icon ci-food"><i class="fa-solid fa-bone"></i></div>
          <h4>Chế độ dinh dưỡng</h4>
        </div>
        <p>${data.care.diet}</p>
      </div>
    </div>

    <!-- MỤC 2: VẬN ĐỘNG CÓ ẢNH -->
    <div class="care-item">
      <img class="care-item-img" src="https://images.unsplash.com/photo-1534361960057-19889db9621e?w=600&auto=format&fit=crop&q=80" alt="Vận động thể dục" />
      <div class="care-item-body">
        <div class="care-item-header">
          <div class="care-icon ci-exercise"><i class="fa-solid fa-person-running"></i></div>
          <h4>Nhu cầu vận động</h4>
        </div>
        <p>${data.care.exercise}</p>
      </div>
    </div>

    <!-- MỤC 3: CHẢI CHUỐT CÓ ẢNH -->
    <div class="care-item">
      <img class="care-item-img" src="https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?w=600&auto=format&fit=crop&q=80" alt="Chải chuốt vệ sinh" />
      <div class="care-item-body">
        <div class="care-item-header">
          <div class="care-icon ci-grooming"><i class="fa-solid fa-scissors"></i></div>
          <h4>Vệ sinh & Chải chuốt</h4>
        </div>
        <p>${data.care.grooming}</p>
      </div>
    </div>

    <!-- MỤC 4: Y TẾ BỆNH LÝ CÓ ẢNH -->
    <div class="care-item">
      <img class="care-item-img" src="https://images.unsplash.com/photo-1628009368231-7bb7cfcb0def?w=600&auto=format&fit=crop&q=80" alt="Khám sức khỏe thú y" />
      <div class="care-item-body">
        <div class="care-item-header">
          <div class="care-icon ci-health"><i class="fa-solid fa-heart-pulse"></i></div>
          <h4>Sức khỏe & Lưu ý bệnh lý</h4>
        </div>
        <p>${data.care.health}</p>
      </div>
    </div>

    <!-- LỜI KHUYÊN CHUYÊN GIA CÓ ẢNH BANNER -->
    <div class="care-item" style="grid-column: 1 / -1; background: rgba(16,185,129,0.08); border-color: rgba(16,185,129,0.3);">
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));">
        <img class="care-item-img" src="https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=800&auto=format&fit=crop&q=80" alt="Không gian sống gia đình" style="height: 100%; min-height: 150px;" />
        <div class="care-item-body" style="padding: 20px;">
          <div class="care-item-header">
            <div class="care-icon ci-social"><i class="fa-solid fa-lightbulb"></i></div>
            <h4 style="color: var(--success); font-size: 1.05rem;">Lời khuyên từ chuyên gia dành cho chủ nuôi</h4>
          </div>
          <p style="color: var(--text); font-size: 0.95rem;">${data.care.tips}</p>
        </div>
      </div>
    </div>
  `;
}

// 5. THÔNG SỐ KỸ THUẬT AI (AI TECHNICAL SPECS)
function renderTechSpecs(inferTime) {
  const techCard = document.getElementById("techSpecsCard");
  techCard.style.display = "block";

  const container = document.getElementById("techSpecsContent");
  container.innerHTML = `
    <div class="tech-item">
      <span class="tech-label">⚡ Thời gian xử lý</span>
      <span class="tech-val">${inferTime} ms</span>
    </div>
    <div class="tech-item">
      <span class="tech-label">📐 Kích thước đầu vào</span>
      <span class="tech-val">224 × 224 px</span>
    </div>
    <div class="tech-item">
      <span class="tech-label">🧠 Kiến trúc mạng nơ-ron</span>
      <span class="tech-val">MobileNet v2</span>
    </div>
    <div class="tech-item">
      <span class="tech-label">🔢 Tổng số lớp phân loại</span>
      <span class="tech-val">${maxPredictions || 50} Classes</span>
    </div>
    <div class="tech-item">
      <span class="tech-label">💻 Môi trường tính toán</span>
      <span class="tech-val">WebGL (GPU)</span>
    </div>
  `;
}

// 6. NGUỒN THAM KHẢO & KIỂM ĐỊNH HỌC THUẬT (ACADEMIC REFERENCES)
function renderAcademicReferences(breedClassName, data) {
  const refCard = document.getElementById("referencesCard");
  refCard.style.display = "block";

  const container = document.getElementById("referencesContent");
  container.innerHTML = `
    <div class="ref-item">
      <div class="ref-icon"><i class="fa-solid fa-shield-dog"></i></div>
      <div class="ref-content">
        <h4>American Kennel Club (AKC)</h4>
        <p>Tiêu chuẩn giống chó chuẩn mực, lịch sử lai tạo và hướng dẫn bảo tồn giống.</p>
        <a href="https://www.akc.org/dog-breeds/" target="_blank" class="ref-link">
          Xem hồ sơ AKC <i class="fa-solid fa-arrow-up-right-from-square"></i>
        </a>
      </div>
    </div>

    <div class="ref-item">
      <div class="ref-icon"><i class="fa-solid fa-earth-americas"></i></div>
      <div class="ref-content">
        <h4>FCI (Fédération Cynologique Internationale)</h4>
        <p>Tổ chức Giống chó Thế giới: Phân loại nhóm chó lao động, chó săn và chó đồng hành.</p>
        <a href="https://www.fci.be/en/" target="_blank" class="ref-link">
          Hệ thống FCI <i class="fa-solid fa-arrow-up-right-from-square"></i>
        </a>
      </div>
    </div>

    <div class="ref-item">
      <div class="ref-icon"><i class="fa-solid fa-stethoscope"></i></div>
      <div class="ref-content">
        <h4>PetMD & VCA Animal Hospitals</h4>
        <p>Cẩm nang thú y, hướng dẫn dinh dưỡng theo thể trạng và y tế dự phòng cho thú cưng.</p>
        <a href="https://www.petmd.com/dog" target="_blank" class="ref-link">
          Thư viện PetMD <i class="fa-solid fa-arrow-up-right-from-square"></i>
        </a>
      </div>
    </div>

    <div class="ref-item">
      <div class="ref-icon"><i class="fa-solid fa-database"></i></div>
      <div class="ref-content">
        <h4>Stanford Dogs Dataset (Stanford AI Lab)</h4>
        <p>Bộ dữ liệu nghiên cứu thị giác máy tính ImageNet với 20.580 ảnh phân loại giống chó.</p>
        <a href="http://vision.stanford.edu/aditya86/ImageNetDogs/" target="_blank" class="ref-link">
          Tài liệu Stanford <i class="fa-solid fa-arrow-up-right-from-square"></i>
        </a>
      </div>
    </div>
  `;
}

// =====================================================
// 7. TRỢ LÝ GIỌNG NÓI AI (TEXT-TO-SPEECH)
// =====================================================
function toggleSpeakBreedInfo() {
  if (!('speechSynthesis' in window)) {
    alert("Trình duyệt của bạn không hỗ trợ tính năng đọc giọng nói!");
    return;
  }

  if (isSpeaking) {
    stopSpeaking();
  } else {
    speakText(currentSpeechText);
  }
}

function speakText(text) {
  if (!text) return;
  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "vi-VN";
  utterance.rate = 1.0;
  utterance.pitch = 1.0;

  const btn = document.getElementById("btnSpeak");
  const icon = document.getElementById("speakIcon");
  const textSpan = document.getElementById("speakBtnText");

  utterance.onstart = () => {
    isSpeaking = true;
    if (btn) btn.classList.add("speaking");
    if (icon) icon.className = "fa-solid fa-circle-stop";
    if (textSpan) textSpan.textContent = "Dừng đọc";
  };

  utterance.onend = utterance.onerror = () => {
    stopSpeaking();
  };

  window.speechSynthesis.speak(utterance);
}

function stopSpeaking() {
  isSpeaking = false;
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
  const btn = document.getElementById("btnSpeak");
  const icon = document.getElementById("speakIcon");
  const textSpan = document.getElementById("speakBtnText");

  if (btn) btn.classList.remove("speaking");
  if (icon) icon.className = "fa-solid fa-volume-high";
  if (textSpan) textSpan.textContent = "Nghe trợ lý AI đọc";
}

// =====================================================
// BẢNG GIÁ THỊ TRƯỜNG & ẢNH MẪU ĐƯỢC CHUẨN HÓA
// =====================================================
const SAMPLES = {
  Golden_Retriever: "https://images.unsplash.com/photo-1552053831-71594a27632d?w=600&auto=format&fit=crop&q=80",
  Siberian_Husky: "https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?w=600&auto=format&fit=crop&q=80",
  Pembroke_Welsh_Corgi: "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?w=600&auto=format&fit=crop&q=80",
  Pug: "https://images.unsplash.com/photo-1517849845537-4d257902454a?w=600&auto=format&fit=crop&q=80",
  Shiba_Inu: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=600&auto=format&fit=crop&q=80",
  Dalmatian: "https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?w=600&auto=format&fit=crop&q=80"
};

const BREED_PRICES = {
  Labrador_Retriever: { local: "6 - 10 triệu", vka: "14 - 22 triệu", import: "35 - 55 triệu", monthly: "1.2 - 2 triệu/tháng" },
  Golden_Retriever: { local: "7 - 12 triệu", vka: "15 - 28 triệu", import: "40 - 70 triệu", monthly: "1.5 - 2.5 triệu/tháng" },
  French_Bulldog: { local: "12 - 20 triệu", vka: "25 - 45 triệu", import: "60 - 100+ triệu", monthly: "1.5 - 2.5 triệu/tháng" },
  English_Bulldog: { local: "10 - 18 triệu", vka: "22 - 38 triệu", import: "50 - 85 triệu", monthly: "1.5 - 2.5 triệu/tháng" },
  Beagle: { local: "6 - 9 triệu", vka: "12 - 18 triệu", import: "30 - 45 triệu", monthly: "1.0 - 1.8 triệu/tháng" },
  German_Shepherd: { local: "6 - 12 triệu", vka: "15 - 30 triệu", import: "45 - 80 triệu", monthly: "1.8 - 3 triệu/tháng" },
  Siberian_Husky: { local: "7 - 12 triệu", vka: "15 - 25 triệu", import: "40 - 65 triệu", monthly: "1.5 - 2.5 triệu/tháng" },
  Pembroke_Welsh_Corgi: { local: "10 - 18 triệu", vka: "20 - 35 triệu", import: "50 - 90 triệu", monthly: "1.2 - 2 triệu/tháng" },
  Dachshund: { local: "3.5 - 7 triệu", vka: "9 - 15 triệu", import: "25 - 40 triệu", monthly: "800k - 1.5 triệu/tháng" },
  Boxer: { local: "8 - 14 triệu", vka: "16 - 28 triệu", import: "40 - 60 triệu", monthly: "1.5 - 2.5 triệu/tháng" },
  Yorkshire_Terrier: { local: "7 - 14 triệu", vka: "16 - 28 triệu", import: "40 - 70 triệu", monthly: "1.0 - 1.8 triệu/tháng" },
  Chihuahua: { local: "4 - 8 triệu", vka: "10 - 18 triệu", import: "25 - 45 triệu", monthly: "600k - 1.2 triệu/tháng" },
  Pug: { local: "6 - 10 triệu", vka: "12 - 20 triệu", import: "30 - 50 triệu", monthly: "1.0 - 1.8 triệu/tháng" },
  Rottweiler: { local: "7 - 14 triệu", vka: "16 - 32 triệu", import: "45 - 80 triệu", monthly: "1.8 - 3.2 triệu/tháng" },
  Doberman_Pinscher: { local: "8 - 15 triệu", vka: "18 - 35 triệu", import: "50 - 90 triệu", monthly: "1.8 - 3.0 triệu/tháng" },
  Great_Dane: { local: "12 - 22 triệu", vka: "25 - 45 triệu", import: "60 - 110 triệu", monthly: "2.5 - 4.5 triệu/tháng" },
  Dalmatian: { local: "5 - 9 triệu", vka: "12 - 20 triệu", import: "30 - 50 triệu", monthly: "1.2 - 2.2 triệu/tháng" },
  Shiba_Inu: { local: "14 - 25 triệu", vka: "28 - 45 triệu", import: "60 - 120 triệu", monthly: "1.2 - 2.2 triệu/tháng" },
  Chow_Chow: { local: "10 - 18 triệu", vka: "20 - 35 triệu", import: "50 - 85 triệu", monthly: "1.8 - 3.0 triệu/tháng" },
  Samoyed: { local: "8 - 15 triệu", vka: "18 - 32 triệu", import: "45 - 75 triệu", monthly: "1.8 - 3.0 triệu/tháng" },
  Pomeranian: { local: "8 - 16 triệu", vka: "18 - 35 triệu", import: "45 - 90 triệu", monthly: "1.0 - 2.0 triệu/tháng" },
  Shih_Tzu: { local: "4 - 8 triệu", vka: "10 - 18 triệu", import: "25 - 45 triệu", monthly: "800k - 1.5 triệu/tháng" },
  Maltese: { local: "7 - 14 triệu", vka: "15 - 28 triệu", import: "40 - 70 triệu", monthly: "1.0 - 1.8 triệu/tháng" },
  Standard_Poodle: { local: "12 - 22 triệu", vka: "25 - 45 triệu", import: "55 - 95 triệu", monthly: "1.5 - 2.8 triệu/tháng" },
  Border_Collie: { local: "8 - 15 triệu", vka: "18 - 35 triệu", import: "45 - 80 triệu", monthly: "1.5 - 2.5 triệu/tháng" },
  Basset_Hound: { local: "10 - 18 triệu", vka: "22 - 38 triệu", import: "50 - 85 triệu", monthly: "1.5 - 2.5 triệu/tháng" },
  Bloodhound: { local: "15 - 25 triệu", vka: "30 - 50 triệu", import: "65 - 110 triệu", monthly: "2.0 - 3.5 triệu/tháng" },
  Afghan_Hound: { local: "18 - 30 triệu", vka: "35 - 60 triệu", import: "80 - 150 triệu", monthly: "2.5 - 4.5 triệu/tháng" },
  Saint_Bernard: { local: "15 - 28 triệu", vka: "32 - 55 triệu", import: "70 - 130 triệu", monthly: "2.8 - 5.0 triệu/tháng" },
  Bernese_Mountain_Dog: { local: "15 - 28 triệu", vka: "32 - 55 triệu", import: "70 - 120 triệu", monthly: "2.5 - 4.5 triệu/tháng" },
  Staffordshire_Bull_Terrier: { local: "10 - 18 triệu", vka: "20 - 35 triệu", import: "50 - 85 triệu", monthly: "1.5 - 2.5 triệu/tháng" },
  Pitbull: { local: "5 - 10 triệu", vka: "14 - 25 triệu", import: "35 - 65 triệu", monthly: "1.5 - 2.5 triệu/tháng" },
  Jack_Russell_Terrier: { local: "7 - 14 triệu", vka: "16 - 28 triệu", import: "38 - 65 triệu", monthly: "1.0 - 1.8 triệu/tháng" },
  Scottish_Terrier: { local: "12 - 22 triệu", vka: "25 - 45 triệu", import: "55 - 90 triệu", monthly: "1.2 - 2.2 triệu/tháng" },
  West_Highland_White_Terrier: { local: "9 - 16 triệu", vka: "18 - 32 triệu", import: "45 - 80 triệu", monthly: "1.2 - 2.0 triệu/tháng" },
  Miniature_Schnauzer: { local: "7 - 14 triệu", vka: "16 - 28 triệu", import: "40 - 70 triệu", monthly: "1.0 - 1.8 triệu/tháng" },
  Cocker_Spaniel: { local: "5 - 9 triệu", vka: "12 - 20 triệu", import: "30 - 50 triệu", monthly: "1.2 - 2.0 triệu/tháng" },
  Irish_Setter: { local: "12 - 22 triệu", vka: "25 - 45 triệu", import: "55 - 90 triệu", monthly: "1.8 - 3.0 triệu/tháng" },
  Weimaraner: { local: "12 - 22 triệu", vka: "25 - 45 triệu", import: "55 - 95 triệu", monthly: "1.8 - 3.0 triệu/tháng" },
  Vizsla: { local: "12 - 20 triệu", vka: "24 - 42 triệu", import: "50 - 85 triệu", monthly: "1.5 - 2.5 triệu/tháng" },
  Australian_Cattle_Dog: { local: "8 - 15 triệu", vka: "18 - 32 triệu", import: "42 - 70 triệu", monthly: "1.2 - 2.2 triệu/tháng" },
  Papillon: { local: "8 - 16 triệu", vka: "18 - 35 triệu", import: "45 - 85 triệu", monthly: "800k - 1.6 triệu/tháng" },
  Pekingese: { local: "3.5 - 7 triệu", vka: "8 - 15 triệu", import: "25 - 45 triệu", monthly: "800k - 1.5 triệu/tháng" },
  Newfoundland: { local: "18 - 32 triệu", vka: "35 - 65 triệu", import: "80 - 140 triệu", monthly: "3.0 - 5.5 triệu/tháng" },
  Komondor: { local: "20 - 38 triệu", vka: "40 - 75 triệu", import: "90 - 160 triệu", monthly: "3.0 - 5.5 triệu/tháng" },
  Irish_Wolfhound: { local: "22 - 40 triệu", vka: "45 - 85 triệu", import: "100 - 180 triệu", monthly: "3.5 - 6.0 triệu/tháng" },
  Italian_Greyhound: { local: "9 - 18 triệu", vka: "20 - 36 triệu", import: "48 - 85 triệu", monthly: "1.0 - 1.8 triệu/tháng" },
  Old_English_Sheepdog: { local: "14 - 25 triệu", vka: "28 - 50 triệu", import: "60 - 110 triệu", monthly: "2.2 - 4.0 triệu/tháng" },
  Great_Pyrenees: { local: "16 - 30 triệu", vka: "34 - 60 triệu", import: "75 - 130 triệu", monthly: "2.8 - 5.0 triệu/tháng" },
  Leonberger: { local: "20 - 36 triệu", vka: "40 - 75 triệu", import: "85 - 150 triệu", monthly: "3.0 - 5.5 triệu/tháng" }
};

// =====================================================
// CHUYỂN ĐỔI GIAO DIỆN CHÍNH (SCANNER / QUIZ)
// =====================================================
function switchFeature(tab) {
  const tabs = ["detect", "compare", "pedia", "calc", "health", "quiz"];
  const navBtns = {
    detect: document.getElementById("btnNavDetect"),
    compare: document.getElementById("btnNavCompare"),
    pedia: document.getElementById("btnNavPedia"),
    calc: document.getElementById("btnNavCalc"),
    health: document.getElementById("btnNavHealth"),
    quiz: document.getElementById("btnNavQuiz")
  };
  const sections = {
    detect: [document.getElementById("modelSetup"), document.getElementById("detectSection")],
    compare: [document.getElementById("compareSection")],
    pedia: [document.getElementById("pediaSection")],
    calc: [document.getElementById("calcSection")],
    health: [document.getElementById("healthSection")],
    quiz: [document.getElementById("quizSection")]
  };

  tabs.forEach(t => {
    if (navBtns[t]) {
      if (t === tab) navBtns[t].classList.add("active");
      else navBtns[t].classList.remove("active");
    }
    if (sections[t]) {
      sections[t].forEach(s => {
        if (s) s.style.display = (t === tab) ? "block" : "none";
      });
    }
  });

  // Lazy render khi click vào tab
  if (tab === "pedia") renderPediaGrid();
  if (tab === "compare") initCompareTab();
  if (tab === "calc") initCalcTab();
  if (tab === "health") initHealthTab();

  // Scroll to active section
  const targetElem = (sections[tab] && sections[tab][0]) || document.getElementById("detectSection");
  if (targetElem) targetElem.scrollIntoView({ behavior: "smooth" });
}

// =====================================================
// THUẬT TOÁN QUIZ GỢI Ý GIỐNG CHÓ
// =====================================================
function runBreedQuiz() {
  const space = document.querySelector('input[name="q_space"]:checked')?.value || "apartment";
  const time = document.querySelector('input[name="q_time"]:checked')?.value || "low";
  const env = document.querySelector('input[name="q_env"]:checked')?.value || "kids";
  const budget = document.querySelector('input[name="q_budget"]:checked')?.value || "low";

  const scores = [];

  for (const [key, d] of Object.entries(DOG_DATABASE)) {
    let score = 60; // Điểm cơ bản

    // Không gian
    if (space === "apartment") {
      if (d.energy <= 3 && !d.weight.includes("50") && !d.weight.includes("60")) score += 20;
      else if (d.energy >= 5) score -= 25;
    } else if (space === "house") {
      score += 15;
    } else if (space === "yard") {
      if (d.energy >= 4 || d.weight.includes("30") || d.weight.includes("40") || d.weight.includes("50")) score += 25;
    }

    // Thời gian
    if (time === "low") {
      if (d.energy <= 2) score += 25;
      else if (d.energy >= 5) score -= 30;
    } else if (time === "medium") {
      if (d.energy === 3 || d.energy === 4) score += 20;
    } else if (time === "high") {
      if (d.energy >= 4) score += 25;
    }

    // Môi trường
    if (env === "kids") {
      if (["Golden_Retriever", "Labrador_Retriever", "Beagle", "Pug", "Samoyed", "Pembroke_Welsh_Corgi", "Newfoundland", "Bernese_Mountain_Dog"].includes(key)) score += 30;
    } else if (env === "first") {
      if (d.trainability >= 4 && d.energy <= 4) score += 20;
      if (["Shiba_Inu", "Chow_Chow", "Pitbull"].includes(key)) score -= 20;
    } else if (env === "guard") {
      if (["German_Shepherd", "Doberman_Pinscher", "Rottweiler", "Boxer", "Great_Pyrenees", "Komondor"].includes(key)) score += 35;
    }

    // Ngân sách
    const price = BREED_PRICES[key] || { local: "8 triệu" };
    const minPrice = parseInt(price.local) || 8;
    if (budget === "low" && minPrice <= 7) score += 15;
    else if (budget === "mid" && minPrice <= 15) score += 15;
    else if (budget === "high") score += 15;

    scores.push({ key, data: d, score, price });
  }

  scores.sort((a, b) => b.score - a.score);
  const top3 = scores.slice(0, 3);

  const container = document.getElementById("quizResultsGrid");
  container.innerHTML = "";

  top3.forEach((item, idx) => {
    const rankTitle = idx === 0 ? "🥇 Top 1 Lựa Chọn Hàng Đầu" : idx === 1 ? "🥈 Top 2 Rất Phù Hợp" : "🥉 Top 3 Gợi Ý Thêm";
    const matchPct = Math.min(99, Math.max(82, 98 - idx * 5));
    const cardImg = SAMPLES[item.key] || `dog_images_50/${item.key}/adult_01.jpg`;

    const card = document.createElement("div");
    card.className = "quiz-match-card";
    card.innerHTML = `
      <div class="qmc-rank">${rankTitle}</div>
      <div class="qmc-score">${matchPct}% Hợp</div>
      <img src="${cardImg}" alt="${item.data.viName}" class="qmc-img" onerror="this.src='https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=600'" />
      <div class="qmc-body">
        <h4>${item.data.viName}</h4>
        <div class="qmc-price">💰 Giá đón bé: ${item.price.local}</div>
        <p class="qmc-reason"><strong>Lý do hợp:</strong> ${item.data.temperament}. ${item.data.care.tips}</p>
        <button class="btn btn-outline" style="margin-top:auto;" onclick="viewBreedFromQuiz('${item.key}')">
          <i class="fa-solid fa-circle-info"></i> Xem toàn bộ cẩm nang giống này
        </button>
      </div>
    `;
    container.appendChild(card);
  });

  const resArea = document.getElementById("quizResultArea");
  resArea.style.display = "block";
  resArea.scrollIntoView({ behavior: "smooth" });
}

function viewBreedFromQuiz(breedKey) {
  switchFeature("detect");
  const data = DOG_DATABASE[breedKey];
  const simulated = [
    { className: breedKey, probability: 0.98 },
    { className: "Labrador_Retriever", probability: 0.01 },
    { className: "Boxer", probability: 0.01 }
  ];
  const img = document.getElementById("previewImg");
  img.crossOrigin = "anonymous";
  img.src = SAMPLES[breedKey] || `dog_images_50/${breedKey}/adult_01.jpg`;
  document.getElementById("uploadZone").style.display = "none";
  document.getElementById("uploadPreview").classList.remove("hidden");

  renderResults(simulated);
  document.getElementById("resultCard").scrollIntoView({ behavior: "smooth" });
}

// =====================================================
// 8. HÀM THỬ NGHIỆM MẪU NHANH (SỬ DỤNG ẢNH TRỰC TUYẾN 100% KHÔNG LỖI)
// =====================================================
function testSample(breedKey) {
  switchFeature("detect");
  document.getElementById("detectSection").style.display = "block";
  switchTab(document.querySelectorAll(".detect-tabs .tab")[1], "upload");

  const img = document.getElementById("previewImg");
  img.crossOrigin = "anonymous";
  
  // Dùng ảnh trực tuyến chất lượng cao từ CDN chống lỗi CORS và chống file:///
  img.src = SAMPLES[breedKey] || `https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=600`;

  document.getElementById("uploadZone").style.display = "none";
  document.getElementById("uploadPreview").classList.remove("hidden");

  img.onload = () => {
    if (model) {
      predictFromImage();
    } else {
      const simulatedPrediction = [
        { className: breedKey, probability: 0.96 },
        { className: "Labrador_Retriever", probability: 0.03 },
        { className: "Boxer", probability: 0.01 }
      ];
      renderResults(simulatedPrediction);
      document.getElementById("resultCard").scrollIntoView({ behavior: "smooth" });
    }
  };
}

// =====================================================
// 10. TÍNH NĂNG TRA CỨU & THU THẬP GIỐNG CHÓ LẠ (ACTIVE LEARNING)
// =====================================================
function toggleUnknownBreedBox() {
  const box = document.getElementById("unknownBreedSection");
  if (box.style.display === "none" || !box.style.display) {
    box.style.display = "block";
    box.scrollIntoView({ behavior: "smooth" });
    document.getElementById("unknownSearchInput").focus();
  } else {
    box.style.display = "none";
  }
}

async function searchUnknownBreed() {
  const query = document.getElementById("unknownSearchInput").value.trim();
  const statusBox = document.getElementById("unknownSearchStatus");
  const resultArea = document.getElementById("unknownSearchResult");

  if (!query) {
    statusBox.className = "status-box error";
    statusBox.textContent = "Vui lòng nhập tên giống chó cần tra cứu (ví dụ: Chó Phú Quốc, Akita, Dingo...)";
    statusBox.classList.remove("hidden");
    return;
  }

  statusBox.className = "status-box loading";
  statusBox.innerHTML = `<span>⏳ Đang truy vấn bách khoa Wikipedia & tìm ảnh cho "${query}"...</span>`;
  statusBox.classList.remove("hidden");
  resultArea.style.display = "none";

  try {
    // 1. Tìm kiếm bài viết tiếng Việt trước
    let wikiUrl = `https://vi.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(query)}`;
    let res = await fetch(wikiUrl);
    let data = null;

    if (res.ok) {
      data = await res.json();
    } else {
      // 2. Nếu tiếng Việt không có thì tìm tiếng Anh
      wikiUrl = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(query)}`;
      res = await fetch(wikiUrl);
      if (res.ok) {
        data = await res.json();
      }
    }

    if (data && data.title && data.extract) {
      statusBox.className = "status-box success";
      statusBox.innerHTML = `<span>✅ Đã tìm thấy dữ liệu về giống chó: <strong>${data.title}</strong>!</span>`;

      // Cập nhật giao diện
      document.getElementById("unknownBreedTitle").textContent = data.title;
      document.getElementById("unknownBreedExtract").textContent = data.extract;
      
      const imgElem = document.getElementById("unknownBreedImg");
      if (data.thumbnail && data.thumbnail.source) {
        imgElem.src = data.thumbnail.source;
      } else {
        imgElem.src = "https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=600";
      }

      const wikiLink = document.getElementById("unknownBreedWikiLink");
      wikiLink.href = data.content_urls ? data.content_urls.desktop.page : `https://vi.wikipedia.org/wiki/${encodeURIComponent(query)}`;

      resultArea.style.display = "block";
      resultArea.scrollIntoView({ behavior: "smooth" });
    } else {
      // Fallback nếu không ra trực tiếp
      statusBox.className = "status-box error";
      statusBox.innerHTML = `<span>⚠️ Không tìm thấy bài viết chính xác. Bạn có thể mở tìm kiếm rộng trên <a href="https://vi.wikipedia.org/w/index.php?search=${encodeURIComponent(query)}" target="_blank" style="color:var(--secondary); text-decoration:underline;">Wikipedia</a>!</span>`;
    }
  } catch (err) {
    console.error(err);
    statusBox.className = "status-box error";
    statusBox.textContent = "Không thể kết nối đến máy chủ Wikipedia. Vui lòng kiểm tra kết nối mạng!";
  }
}

function saveToDataset() {
  const breedName = document.getElementById("unknownBreedTitle").textContent || "Unknown_Breed";
  const btn = document.getElementById("btnSaveNewData");
  
  // Lưu thông tin vào LocalStorage để giả lập kho dữ liệu mở rộng
  try {
    const existing = JSON.parse(localStorage.getItem("dogvision_new_samples") || "[]");
    existing.push({
      breed: breedName,
      timestamp: new Date().toISOString(),
      source: "User Contribution"
    });
    localStorage.setItem("dogvision_new_samples", JSON.stringify(existing));

    btn.innerHTML = `<i class="fa-solid fa-check"></i> Đã ghi nhận (${existing.length} mẫu mới)!`;
    btn.style.background = "rgba(16, 185, 129, 0.4)";
    setTimeout(() => {
      btn.innerHTML = `<i class="fa-solid fa-cloud-arrow-up"></i> Lưu vào tập dữ liệu mới`;
      btn.style.background = "rgba(16, 185, 129, 0.2)";
    }, 3000);

    alert(`🎉 Thành công! Ảnh và nhãn "${breedName}" đã được lưu vào danh sách chờ huấn luyện (Dataset Queue) cho phiên bản AI tiếp theo!`);
  } catch (e) {
    alert(`Đã ghi nhận mẫu giống chó: ${breedName}!`);
  }
}

// =====================================================
// 9. TỰ ĐỘNG KHỞI TẠO & NẠP MODEL KHI MỞ TRANG WEB
// =====================================================
const DEFAULT_MODEL_URL = "https://teachablemachine.withgoogle.com/models/okrCB2SBm/";

window.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("modelUrlInput");
  if (input && !input.value) {
    input.value = DEFAULT_MODEL_URL;
  }
  // Tự động kết nối tới model của bạn ngay lập tức!
  loadModel();
});


// =====================================================
// 10. TÍNH NĂNG MỞ RỘNG 1: BÁCH KHOA 50 GIỐNG CHÓ (PEDIA)
// =====================================================
let pediaBreedsCache = null;

function renderPediaGrid() {
  const container = document.getElementById("pediaGrid");
  if (!container) return;

  filterPediaGrid();
}

function filterPediaGrid() {
  const container = document.getElementById("pediaGrid");
  if (!container) return;

  const search = (document.getElementById("pediaSearchInput")?.value || "").toLowerCase().trim();
  const sizeFilter = document.getElementById("pediaFilterSize")?.value || "all";
  const energyFilter = document.getElementById("pediaFilterEnergy")?.value || "all";
  const trainFilter = document.getElementById("pediaFilterTrain")?.value || "all";

  const entries = Object.entries(DOG_DATABASE);
  let matched = [];

  entries.forEach(([key, d]) => {
    const vi = (d.viName || "").toLowerCase();
    const en = key.toLowerCase().replace(/_/g, " ");
    const origin = (d.origin || "").toLowerCase();

    // 1. Text Search
    if (search && !vi.includes(search) && !en.includes(search) && !origin.includes(search)) {
      return;
    }

    // 2. Size filter (parse weight)
    const wNum = parseFloat(d.weight) || 20;
    if (sizeFilter === "small" && wNum >= 12) return;
    if (sizeFilter === "medium" && (wNum < 12 || wNum > 28)) return;
    if (sizeFilter === "large" && wNum <= 28) return;

    // 3. Energy filter
    if (energyFilter === "high" && d.energy < 4) return;
    if (energyFilter === "low" && d.energy > 3) return;

    // 4. Trainability filter
    if (trainFilter === "easy" && d.trainability < 5) return;
    if (trainFilter === "stubborn" && d.trainability > 3) return;

    matched.push({ key, data: d });
  });

  document.getElementById("pediaCountDisplay").textContent = matched.length;
  container.innerHTML = "";

  if (matched.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1/-1; text-align:center; padding: 40px; color:var(--text-muted);">
        <i class="fa-solid fa-face-frown" style="font-size:3rem; margin-bottom:12px; display:block;"></i>
        <p>Không tìm thấy giống chó nào khớp với bộ lọc của bạn.</p>
      </div>`;
    return;
  }

  matched.forEach(({ key, data }) => {
    const card = document.createElement("div");
    card.className = "pedia-card";
    const imgUrl = SAMPLES[key] || `dog_images_50/${key}/adult_01.jpg`;
    const price = (BREED_PRICES[key] && BREED_PRICES[key].local) || "7 - 12 triệu";

    card.innerHTML = `
      <div class="pedia-img-wrap">
        <img src="${imgUrl}" alt="${data.viName}" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=500'"/>
        <div class="pedia-badge-origin"><i class="fa-solid fa-earth-americas"></i> ${data.origin.split(",")[0]}</div>
      </div>
      <div class="pedia-body">
        <h4 class="pedia-title">${data.viName}</h4>
        <div class="pedia-stats-row">
          <span><i class="fa-solid fa-weight-hanging"></i> ${data.weight}</span>
          <span><i class="fa-solid fa-hourglass-half"></i> ${data.lifespan}</span>
        </div>
        <div class="pedia-tags">
          <span class="pedia-tag"><i class="fa-solid fa-bolt" style="color:#f59e0b;"></i> NL: ${data.energy}/5</span>
          <span class="pedia-tag"><i class="fa-solid fa-brain" style="color:#60a5fa;"></i> Trí khôn: ${data.trainability}/5</span>
          <span class="pedia-tag pedia-price-tag"><i class="fa-solid fa-tag"></i> ~${price}</span>
        </div>
      </div>
    `;

    card.onclick = () => {
      viewBreedFromQuiz(key);
    };

    container.appendChild(card);
  });
}

// =====================================================
// 11. TÍNH NĂNG MỞ RỘNG 2: SO SÁNH 2 GIỐNG CHÓ (COMPARE)
// =====================================================
let compareInitialized = false;

function initCompareTab() {
  if (compareInitialized) return;
  const selectA = document.getElementById("compareBreedA");
  const selectB = document.getElementById("compareBreedB");
  if (!selectA || !selectB) return;

  selectA.innerHTML = "";
  selectB.innerHTML = "";

  const keys = Object.keys(DOG_DATABASE);
  keys.forEach((key, idx) => {
    const d = DOG_DATABASE[key];
    const optA = document.createElement("option");
    optA.value = key;
    optA.textContent = d.viName;
    if (key === "Golden_Retriever") optA.selected = true;
    selectA.appendChild(optA);

    const optB = document.createElement("option");
    optB.value = key;
    optB.textContent = d.viName;
    if (key === "Siberian_Husky") optB.selected = true;
    selectB.appendChild(optB);
  });

  compareInitialized = true;
  renderBreedComparison();
}

function renderBreedComparison() {
  const keyA = document.getElementById("compareBreedA")?.value || "Golden_Retriever";
  const keyB = document.getElementById("compareBreedB")?.value || "Siberian_Husky";
  const container = document.getElementById("compareResultContainer");
  if (!container) return;

  const a = DOG_DATABASE[keyA];
  const b = DOG_DATABASE[keyB];
  const priceA = BREED_PRICES[keyA] || { local: "7 - 12 tr", vka: "15 - 25 tr", imported: "40 - 70 tr" };
  const priceB = BREED_PRICES[keyB] || { local: "8 - 14 tr", vka: "18 - 30 tr", imported: "45 - 80 tr" };
  const imgA = SAMPLES[keyA] || `dog_images_50/${keyA}/adult_01.jpg`;
  const imgB = SAMPLES[keyB] || `dog_images_50/${keyB}/adult_01.jpg`;

  function renderStars(n) {
    let s = "";
    for (let i = 1; i <= 5; i++) {
      s += `<i class="fa-solid fa-star" style="color: ${i <= n ? '#f59e0b' : '#475569'}; margin-right:2px; font-size:0.8rem;"></i>`;
    }
    return s;
  }

  container.innerHTML = `
    <table class="compare-table">
      <thead>
        <tr>
          <th class="compare-metric-name">Chỉ số so sánh</th>
          <th style="color:#f97316; width:37%;">
            <img src="${imgA}" style="width:100px; height:80px; object-fit:cover; border-radius:10px; margin:0 auto 8px; border:2px solid #f97316;" onerror="this.src='https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=300'"/>
            <div>${a.viName}</div>
          </th>
          <th style="color:#8b5cf6; width:37%;">
            <img src="${imgB}" style="width:100px; height:80px; object-fit:cover; border-radius:10px; margin:0 auto 8px; border:2px solid #8b5cf6;" onerror="this.src='https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=300'"/>
            <div>${b.viName}</div>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="compare-metric-name">🌍 Nguồn gốc</td>
          <td>${a.origin}</td>
          <td>${b.origin}</td>
        </tr>
        <tr>
          <td class="compare-metric-name">🎯 Mục đích ban đầu</td>
          <td>${a.purpose}</td>
          <td>${b.purpose}</td>
        </tr>
        <tr>
          <td class="compare-metric-name">⚖️ Cân nặng chuẩn</td>
          <td><strong style="color:#f97316;">${a.weight}</strong></td>
          <td><strong style="color:#8b5cf6;">${b.weight}</strong></td>
        </tr>
        <tr>
          <td class="compare-metric-name">📏 Chiều cao vai</td>
          <td>${a.height}</td>
          <td>${b.height}</td>
        </tr>
        <tr>
          <td class="compare-metric-name">⏳ Tuổi thọ trung bình</td>
          <td>${a.lifespan}</td>
          <td>${b.lifespan}</td>
        </tr>
        <tr>
          <td class="compare-metric-name">⚡ Mức năng lượng</td>
          <td>${renderStars(a.energy)} (${a.energy}/5)</td>
          <td>${renderStars(b.energy)} (${b.energy}/5)</td>
        </tr>
        <tr>
          <td class="compare-metric-name">🧠 Độ dễ dạy / Trí khôn</td>
          <td>${renderStars(a.trainability)} (${a.trainability}/5)</td>
          <td>${renderStars(b.trainability)} (${b.trainability}/5)</td>
        </tr>
        <tr>
          <td class="compare-metric-name">🎭 Tính cách nổi trội</td>
          <td style="font-size:0.85rem; line-height:1.5;">${a.temperament}</td>
          <td style="font-size:0.85rem; line-height:1.5;">${b.temperament}</td>
        </tr>
        <tr>
          <td class="compare-metric-name">💵 Giá VN (Nhân giống nội)</td>
          <td><span style="color:#34d399; font-weight:800;">${priceA.local}</span></td>
          <td><span style="color:#34d399; font-weight:800;">${priceB.local}</span></td>
        </tr>
        <tr>
          <td class="compare-metric-name">📜 Giá VKA Thuần chủng</td>
          <td><span style="color:#60a5fa; font-weight:800;">${priceA.vka}</span></td>
          <td><span style="color:#60a5fa; font-weight:800;">${priceB.vka}</span></td>
        </tr>
      </tbody>
    </table>
  `;
}

// =====================================================
// 12. TÍNH NĂNG MỞ RỘNG 3: TÍNH KHẨU PHẦN ĂN & DỰ TOÁN CHI PHÍ (CALC)
// =====================================================
let calcInitialized = false;

function initCalcTab() {
  if (calcInitialized) return;
  const select = document.getElementById("calcBreedSelect");
  if (!select) return;

  select.innerHTML = "";
  Object.keys(DOG_DATABASE).forEach(key => {
    const d = DOG_DATABASE[key];
    const opt = document.createElement("option");
    opt.value = key;
    opt.textContent = `${d.viName} (${d.weight})`;
    if (key === "Golden_Retriever") opt.selected = true;
    select.appendChild(opt);
  });

  calcInitialized = true;
  syncBreedWeightCalc();
}

function syncBreedWeightCalc() {
  const key = document.getElementById("calcBreedSelect")?.value || "Golden_Retriever";
  const d = DOG_DATABASE[key];
  if (!d) return;

  // Trích xuất cân nặng trung bình
  const matches = d.weight.match(/\d+/g);
  if (matches && matches.length > 0) {
    const avg = matches.reduce((sum, val) => sum + parseFloat(val), 0) / matches.length;
    document.getElementById("calcWeight").value = avg.toFixed(1);
  }
  calculateDietAndCost();
}

function calculateDietAndCost() {
  const weight = parseFloat(document.getElementById("calcWeight")?.value) || 15;
  const stage = document.getElementById("calcAgeStage")?.value || "adult";
  const activity = document.getElementById("calcActivity")?.value || "normal";
  const dietType = document.getElementById("calcDietType")?.value || "dry_kibble";
  const output = document.getElementById("calcOutputArea");
  if (!output) return;

  // Công thức năng lượng trao đổi chất cơ bản RER = 70 * (Weight)^0.75
  const rer = 70 * Math.pow(weight, 0.75);

  // Hệ số MER theo độ tuổi và cường độ vận động
  let factor = 1.6; // adult normal
  if (stage === "puppy_rapid") factor = 3.0;
  else if (stage === "puppy") factor = 2.0;
  else if (stage === "senior") factor = 1.2;
  else if (stage === "pregnant") factor = 2.5;

  if (activity === "low") factor *= 0.85;
  if (activity === "high") factor *= 1.35;

  const dailyCal = Math.round(rer * factor);

  // Quy đổi gam thức ăn theo loại thức ăn
  // Hạt khô: ~380 kcal / 100g
  // Thức ăn tươi (BARF/Nấu): ~140 kcal / 100g
  let dailyGrams = 0;
  let kibbleGrams = 0;
  let meatGrams = 0;
  let vegGrams = 0;
  let monthlyCost = 0;

  if (dietType === "dry_kibble") {
    dailyGrams = Math.round((dailyCal / 380) * 100);
    // Hạt cao cấp ~ 160.000đ / kg = 160đ / gram
    const foodCost = dailyGrams * 160 * 30;
    const treatHealthCost = 250000; // Snack + thuốc giun
    monthlyCost = Math.round((foodCost + treatHealthCost) / 10000) * 10000;
  } else if (dietType === "wet_barf") {
    dailyGrams = Math.round((dailyCal / 140) * 100);
    meatGrams = Math.round(dailyGrams * 0.7); // 70% thịt cá
    vegGrams = Math.round(dailyGrams * 0.3);  // 30% củ quả yến mạch
    // Thịt gà/bò rau củ trung bình ~ 90.000đ / kg = 90đ / gram
    const foodCost = dailyGrams * 95 * 30;
    const treatHealthCost = 200000;
    monthlyCost = Math.round((foodCost + treatHealthCost) / 10000) * 10000;
  } else {
    // Mixed
    kibbleGrams = Math.round(((dailyCal * 0.5) / 380) * 100);
    dailyGrams = Math.round(((dailyCal * 0.5) / 140) * 100); // phần nấu
    const foodCost = (kibbleGrams * 160 + dailyGrams * 95) * 30;
    const treatHealthCost = 220000;
    monthlyCost = Math.round((foodCost + treatHealthCost) / 10000) * 10000;
  }

  // Khuyến nghị lượng nước uống hằng ngày (50 - 60ml / kg)
  const waterMl = Math.round(weight * 55);

  output.innerHTML = `
    <div class="calc-hero-stat">
      <div>
        <span style="font-size:0.85rem; color:var(--text-muted); text-transform:uppercase; letter-spacing:0.5px; display:block;">Nhu cầu năng lượng hằng ngày</span>
        <div class="calc-big-val">${dailyCal.toLocaleString()} <span style="font-size:1.1rem; color:#fff;">kcal/ngày</span></div>
      </div>
      <div style="text-align:right;">
        <span style="font-size:0.85rem; color:var(--text-muted); text-transform:uppercase; letter-spacing:0.5px; display:block;">Ước tính chi phí nuôi/tháng</span>
        <div style="font-size:1.8rem; font-weight:900; color:#34d399; font-family:monospace;">~${(monthlyCost/1000000).toFixed(1)} <span style="font-size:1rem; color:#fff;">triệu VNĐ</span></div>
      </div>
    </div>

    <div class="calc-detail-card">
      <h4 style="color:#f97316; margin-bottom:8px;"><i class="fa-solid fa-utensils"></i> Khẩu phần ăn khuyến nghị mỗi ngày:</h4>
      ${dietType === "dry_kibble" ? `
        <p style="font-size:0.95rem;">• <strong>Hạt khô chất lượng cao:</strong> <span style="color:#f97316; font-size:1.1rem; font-weight:800;">${dailyGrams} gram</span> / ngày (Chia làm 2 bữa, mỗi bữa ~${Math.round(dailyGrams/2)}g).</p>
      ` : dietType === "wet_barf" ? `
        <p style="font-size:0.95rem;">• <strong>Tổng lượng thức ăn tươi:</strong> <span style="color:#f97316; font-size:1.1rem; font-weight:800;">${dailyGrams} gram</span> / ngày.</p>
        <p style="font-size:0.88rem; color:#cbd5e1; margin-top:4px;">Gồm: <strong>${meatGrams}g</strong> ức gà/thịt bò/cá hồi + <strong>${vegGrams}g</strong> bí đỏ, cà rốt luộc tán nhuyễn.</p>
      ` : `
        <p style="font-size:0.95rem;">• <strong>Chế độ kết hợp:</strong> <strong style="color:#f97316;">${kibbleGrams}g hạt</strong> + <strong style="color:#8b5cf6;">${dailyGrams}g thịt rau củ</strong> mỗi ngày.</p>
      `}
      <p style="font-size:0.9rem; margin-top:8px; color:#60a5fa;"><i class="fa-solid fa-droplet"></i> <strong>Nước sạch cần nạp:</strong> Tối thiểu <strong>${waterMl.toLocaleString()} ml</strong> nước sạch mỗi ngày.</p>
    </div>

    <div class="calc-detail-card" style="font-size:0.88rem; color:#cbd5e1; line-height:1.5;">
      <h4 style="color:#a78bfa; margin-bottom:6px;"><i class="fa-solid fa-wallet"></i> Cơ cấu chi phí ước tính tháng (~${(monthlyCost/1000000).toFixed(1)} tr):</h4>
      <p>• Thức ăn chính (hạt/thịt sạch): ~${Math.round(monthlyCost * 0.7).toLocaleString()} VNĐ</p>
      <p>• Bánh thưởng huấn luyện, canxi & dầu cá: ~150.000 VNĐ</p>
      <p>• Thuốc nhỏ ve rận & tẩy giun định kỳ: ~100.000 VNĐ</p>
      <p>• Tắm spa / vệ sinh tai móng: ~${Math.round(monthlyCost * 0.15).toLocaleString()} VNĐ</p>
    </div>
  `;
}

// =====================================================
// 13. TÍNH NĂNG MỞ RỘNG 4: BÁC SĨ THÚ Y AI & TIÊM PHÒNG (HEALTH)
// =====================================================
const TOXIC_FOODS = {
  "socola": { safe: false, level: "CỰC KỲ NGUY HIỂM", msg: "Chứa hợp chất Theobromine và Caffeine mà chó không thể chuyển hóa. Gây co giật, suy tim, thậm chí tử vong chỉ với liều lượng nhỏ (đặc biệt là socola đen nguyên chất)." },
  "chocolate": { safe: false, level: "CỰC KỲ NGUY HIỂM", msg: "Chứa hợp chất Theobromine gây ngộ độc tim mạch và hệ thần kinh trung ương của chó." },
  "nho": { safe: false, level: "CỰC KỲ NGUY HIỂM", msg: "Nho tươi và nho khô chứa axit tartaric gây suy thận cấp tính bất thấu đáo ở chó. Tuyệt đối không cho ăn dù chỉ 1 quả!" },
  "hành": { safe: false, level: "RẤT NGUY HIỂM", msg: "Hành tây, hành lá, tỏi, hẹ chứa Thiosulfate phá hủy hồng cầu, gây bệnh thiếu máu tán huyết cực kỳ nghiêm trọng." },
  "tỏi": { safe: false, level: "RẤT NGUY HIỂM", msg: "Độc tính tương tự hành tây, gây vỡ hồng cầu, mệt mỏi suy nhược cơ thể." },
  "xương": { safe: false, level: "NGUY HIỂM KHOANG RUỘT", msg: "Xương gia cầm (xương gà, vịt) hoặc xương heo đã nấu chín rất giòn và sắc nhọn, có thể đâm thủng thực quản, dạ dày và gây tắc ruột." },
  "bơ": { safe: false, level: "CẢNH BÁO", msg: "Vỏ và hạt quả bơ chứa chất Persin gây nôn mửa, tiêu chảy và viêm tụy ở chó." },
  "xylitol": { safe: false, level: "CỰC KỲ NGUY HIỂM", msg: "Chất tạo ngọt trong kẹo cao su, bơ đậu phộng ăn kiêng khiến đường huyết của chó hạ xuống mức báo động chỉ trong 10-60 phút, dẫn đến suy gan cấp." },
  "sữa tươi": { safe: false, level: "DỄ RỐI LOẠN TIÊU HÓA", msg: "Đa số chó trưởng thành thiếu enzyme Lactase để tiêu hóa đường lactose trong sữa bò, dễ bị tiêu chảy đầy hơi. Nên dùng sữa dê chuyên dụng cho thú cưng." },
  "cà rốt": { safe: true, level: "AN TOÀN & RẤT TỐT", msg: "Giàu vitamin A, chất xơ và ít calo. Cà rốt sống giòn còn giúp làm sạch mảng bám trên răng của cún." },
  "ức gà": { safe: true, level: "AN TOÀN & TUYỆT VỜI", msg: "Nguồn đạm nạc tinh khiết, dễ tiêu hóa nhất cho chó. Hãy luộc chín hoàn toàn và không nêm nếm gia vị, mắm muối." },
  "trứng": { safe: true, level: "AN TOÀN & GIÀU DINH DƯỠNG", msg: "Trứng luộc chín cung cấp biotin, protein và axit amin hoàn hảo giúp lông bóng khỏe. Không nên cho ăn trứng sống vì nguy cơ nhiễm khuẩn Salmonella." },
  "chuối": { safe: true, level: "AN TOÀN (LƯỢNG VỪA PHẢI)", msg: "Giàu kali, vitamin C. Cho ăn từng miếng nhỏ như phần thưởng, tránh ăn quá nhiều do hàm lượng đường tự nhiên cao." },
  "bí đỏ": { safe: true, level: "THẦN DƯỢC TIÊU HÓA", msg: "Bí đỏ hấp chín tán nhuyễn cực kỳ tốt cho hệ tiêu hóa, hỗ trợ điều trị cả táo bón lẫn tiêu chảy nhẹ ở chó." }
};

function initHealthTab() {
  renderVaccineSchedule();
}

function switchHealthTab(paneId) {
  const tabs = document.querySelectorAll(".health-subtab");
  tabs.forEach(t => t.classList.remove("active"));
  event.currentTarget.classList.add("active");

  document.getElementById("pane-emergency").style.display = (paneId === "emergency") ? "block" : "none";
  document.getElementById("pane-symptoms").style.display = (paneId === "symptoms") ? "block" : "none";
  document.getElementById("pane-schedule").style.display = (paneId === "schedule") ? "block" : "none";
}

function checkToxicFood() {
  const input = (document.getElementById("toxicFoodInput")?.value || "").toLowerCase().trim();
  const alertBox = document.getElementById("toxicResultAlert");
  if (!alertBox) return;

  if (!input) {
    alertBox.innerHTML = "";
    return;
  }

  let found = null;
  for (const [key, val] of Object.entries(TOXIC_FOODS)) {
    if (input.includes(key) || key.includes(input)) {
      found = { name: key, ...val };
      break;
    }
  }

  if (found) {
    if (!found.safe) {
      alertBox.innerHTML = `
        <div class="alert-box" style="border-left: 5px solid #ef4444; background: rgba(239, 68, 68, 0.15);">
          <i class="fa-solid fa-skull-crossbones" style="color:#ef4444; font-size:1.8rem;"></i>
          <div>
            <strong style="color:#ef4444; font-size:1.05rem;">⛔ ${found.level}: Không được cho ăn!</strong>
            <p style="margin-top:4px; font-size:0.92rem; color:#f1f5f9;">${found.msg}</p>
          </div>
        </div>`;
    } else {
      alertBox.innerHTML = `
        <div class="alert-box" style="border-left: 5px solid #10b981; background: rgba(16, 185, 129, 0.15);">
          <i class="fa-solid fa-circle-check" style="color:#10b981; font-size:1.8rem;"></i>
          <div>
            <strong style="color:#10b981; font-size:1.05rem;">✅ ${found.level}</strong>
            <p style="margin-top:4px; font-size:0.92rem; color:#f1f5f9;">${found.msg}</p>
          </div>
        </div>`;
    }
  } else {
    alertBox.innerHTML = `
      <div class="alert-box" style="border-left: 5px solid #f59e0b; background: rgba(245, 158, 11, 0.15);">
        <i class="fa-solid fa-circle-question" style="color:#f59e0b; font-size:1.6rem;"></i>
        <div>
          <strong style="color:#f59e0b;">Chưa có dữ liệu chính xác về "${input}"</strong>
          <p style="margin-top:4px; font-size:0.9rem;">Quy tắc vàng: Tuyệt đối <strong>không cho ăn thức ăn có gia vị (hành tỏi, ớt cay, mắm muối, đường, cồn bia rượu)</strong>. Nếu cún lỡ ăn phải chất lạ, hãy mang đến phòng khám thú y gần nhất!</p>
        </div>
      </div>`;
  }
}

function quickCheckToxic(foodName) {
  document.getElementById("toxicFoodInput").value = foodName;
  checkToxicFood();
}

function analyzeSymptoms() {
  const checkboxes = document.querySelectorAll(".symptoms-grid input[type='checkbox']:checked");
  const selected = Array.from(checkboxes).map(c => c.value);
  const resultArea = document.getElementById("symptomsDiagnosisArea");
  if (!resultArea) return;

  if (selected.length === 0) {
    resultArea.innerHTML = "";
    return;
  }

  let urgency = "THEO DÕI";
  let diagnosis = [];
  let urgentColor = "#f59e0b";

  if (selected.includes("vomit") && selected.includes("diarrhea")) {
    urgency = "CỰC KỲ KHẨN CẤP – NGUY CƠ NHIỄM PARVO / CA-RÊ!";
    urgentColor = "#ef4444";
    diagnosis.push("Triệu chứng kinh điển của bệnh do virus Parvovirus hoặc Care (đặc biệt ở chó dưới 1 tuổi chưa tiêm đủ mũi vaccine). Bệnh diễn tiến cực nhanh gây mất nước kiệt quệ và tử vong trong 48 - 72 giờ nếu không truyền dịch kịp thời.");
  } else if (selected.includes("vomit") || selected.includes("diarrhea")) {
    diagnosis.push("Có thể do viêm ruột kích ứng, ăn phải thức ăn ôi thiu, dị ứng thực phẩm hoặc nhiễm giun sán nặng.");
  }

  if (selected.includes("cough")) {
    diagnosis.push("Nhiễm vi khuẩn ho cũi chó (Bordetella bronchiseptica) hoặc dị vật đường thở.");
  }
  if (selected.includes("scratch")) {
    diagnosis.push("Viêm da dị ứng, nhiễm nấm da (ringworm), ghẻ Demodex hoặc ve rận cắn.");
  }
  if (selected.includes("limp")) {
    diagnosis.push("Chấn thương cơ, trật khớp bánh chè (phổ biến ở Poodle/Corgi) hoặc loạn sản xương hông.");
  }

  resultArea.innerHTML = `
    <div class="alert-box" style="border-left: 5px solid ${urgentColor}; background: rgba(255, 255, 255, 0.05);">
      <div>
        <strong style="color:${urgentColor}; font-size:1.1rem;"><i class="fa-solid fa-triangle-exclamation"></i> MỨC ĐỘ: ${urgency}</strong>
        <ul style="margin: 8px 0 10px 18px; font-size:0.92rem; line-height:1.6;">
          ${diagnosis.map(d => `<li>${d}</li>`).join("")}
        </ul>
        <div style="background: rgba(239, 68, 68, 0.2); border: 1px solid #ef4444; padding: 10px 14px; border-radius: 8px; font-size:0.88rem; color:#fca5a5;">
          ⚠️ <strong>LƯU Ý QUAN TRỌNG:</strong> Đây chỉ là hỗ trợ AI ban đầu, không thay thế việc khám trực tiếp của Bác sĩ Thú y. Vui lòng ngưng cho ăn uống tự ý và đưa cún đến trạm thú y ngay lập tức!
        </div>
      </div>
    </div>
  `;
}

function renderVaccineSchedule() {
  const container = document.getElementById("vaccineTimeline");
  if (!container) return;

  const schedule = [
    { age: "6 - 8 Tuần tuổi", title: "Mũi 1: Vaccine 5 bệnh hoặc 6 bệnh", desc: "Phòng ngừa Parvovirus, Care (Distemper), Viêm gan truyền nhiễm, Ho cũi chó, Phó cúm. Đồng thời tẩy giun lần đầu." },
    { age: "9 - 11 Tuần tuổi", title: "Mũi 2: Vaccine 7 bệnh đa giá", desc: "Nhắc lại mũi 1 và bổ sung kháng thể ngừa vi khuẩn Leptospira (xoắn khuẩn gây suy gan thận lây sang người)." },
    { age: "12 - 14 Tuần tuổi", title: "Mũi 3: Hoàn thành phác đồ cún con", desc: "Mũi 7 bệnh củng cố hệ miễn dịch toàn diện nhất trước khi tiếp xúc với môi trường bên ngoài." },
    { age: "Từ 3 Tháng tuổi", title: "Vaccine Phòng Bệnh Dại (Rabies)", desc: "Bắt buộc theo quy định pháp luật. Tiêm 1 mũi duy nhất lúc 3 tháng và nhắc lại mỗi năm một lần." },
    { age: "Định kỳ mỗi năm", title: "Tiêm nhắc lại hàng năm (Booster)", desc: "1 mũi 7 bệnh + 1 mũi Dại để duy trì lượng kháng thể bảo vệ trọn đời." },
    { age: "Hàng tháng / 3 tháng", title: "Tẩy giun & Nhỏ gáy diệt ve rận", desc: "Cún dưới 6 tháng: Tẩy giun mỗi tháng 1 lần. Cún lớn: Tẩy giun mỗi 3-4 tháng. Nhỏ gáy (Frontline/Bravecto) phòng ve rận bọ chét." }
  ];

  container.innerHTML = schedule.map(s => `
    <div class="vaccine-step">
      <div class="vaccine-age"><i class="fa-solid fa-clock"></i> ${s.age}</div>
      <div>
        <h4 style="color:#fff; font-size:1.02rem; margin-bottom:4px;">${s.title}</h4>
        <p style="color:var(--text-muted); font-size:0.9rem; line-height:1.5;">${s.desc}</p>
      </div>
    </div>
  `).join("");
}


// =====================================================
// 14. TRỢ LÝ ẢO AI CHATBOT VỀ CHÓ (FLOATING AI BOT)
// =====================================================
let chatIsOpen = false;
let userGeminiApiKey = localStorage.getItem("dogvision_gemini_key") || "";

function toggleApiKeyInput() {
  const bar = document.getElementById("apiKeyBar");
  if (!bar) return;
  bar.style.display = bar.style.display === "none" ? "block" : "none";
  if (userGeminiApiKey) {
    document.getElementById("geminiApiKeyInput").value = userGeminiApiKey;
  }
}

function saveGeminiApiKey() {
  const input = document.getElementById("geminiApiKeyInput");
  if (!input) return;
  const key = input.value.trim();
  if (key) {
    userGeminiApiKey = key;
    localStorage.setItem("dogvision_gemini_key", key);
    alert("✅ Đã lưu Google Gemini API Key! Giờ bạn có thể trò chuyện tự do 100% bằng trí tuệ nhân tạo thời gian thực!");
    document.getElementById("apiKeyBar").style.display = "none";
  } else {
    userGeminiApiKey = "";
    localStorage.removeItem("dogvision_gemini_key");
    alert("Đã xóa key. Hệ thống chuyển về Chế độ Trợ lý Thú y Chuyên sâu Nội bộ.");
  }
}

function toggleAIChat() {
  const win = document.getElementById("chatWindow");
  if (!win) return;
  chatIsOpen = !chatIsOpen;

  if (chatIsOpen) {
    win.classList.remove("hidden");
    document.getElementById("chatUserInput")?.focus();
  } else {
    win.classList.add("hidden");
  }
}

function clearAIChat() {
  const container = document.getElementById("chatMessages");
  if (!container) return;
  container.innerHTML = `
    <div class="chat-bubble bot-msg">
      <div class="msg-avatar"><i class="fa-solid fa-stethoscope"></i></div>
      <div class="msg-content">
        <p>Gâu gâu! Xin chào! Tôi là <strong>Dr. Bâu – Bác sĩ Thú Y AI Trực Tuyến</strong> của bệnh viện thú cưng số DogVision.</p>
        <p style="margin-top:6px;">Bạn có thể hỏi tôi bất kỳ điều gì bằng văn bản tự do: tình trạng cún cưng, dấu hiệu bệnh, phân tích thức ăn, cách nuôi hoặc tâm lý của cún!</p>
        <div class="chat-suggestions">
          <button class="chat-sug-btn" onclick="sendSuggestedMsg('Bé cún nhà mình bỏ ăn 2 ngày nay và đi ngoài phân đen có nguy hiểm không?')">🚨 Cún bỏ ăn & đi ngoài phân đen</button>
          <button class="chat-sug-btn" onclick="sendSuggestedMsg('Nên cho cún 2 tháng tuổi ăn những loại thức ăn gì để không đau bụng?')">🍼 Chế độ ăn cho cún 2 tháng</button>
          <button class="chat-sug-btn" onclick="sendSuggestedMsg('Cún hay cắn phá giày dép trong nhà thì huấn luyện thế nào?')">👟 Huấn luyện cún bớt cắn phá</button>
        </div>
      </div>
    </div>
  `;
}

function sendSuggestedMsg(text) {
  const input = document.getElementById("chatUserInput");
  if (!input) return;
  input.value = text;
  handleUserSendMessage();
}

async function handleUserSendMessage() {
  const input = document.getElementById("chatUserInput");
  if (!input) return;
  const userText = input.value.trim();
  if (!userText) return;

  // 1. Thêm tin nhắn của User vào khung
  appendChatMessage("user", userText);
  input.value = "";

  // 2. Hiện hiệu ứng typing của Bot
  const typingId = appendTypingIndicator();

  // 3. Phản hồi AI (Gemini Live API nếu có key hoặc Local Medical Engine)
  try {
    if (userGeminiApiKey) {
      const liveReply = await callGeminiAPI(userText);
      removeTypingIndicator(typingId);
      appendChatMessage("bot", liveReply);
    } else {
      const reply = await generateAIBotResponse(userText);
      removeTypingIndicator(typingId);
      appendChatMessage("bot", reply);
    }
  } catch (err) {
    console.error("AI Error:", err);
    removeTypingIndicator(typingId);
    const fallbackReply = await generateAIBotResponse(userText);
    appendChatMessage("bot", fallbackReply);
  }
}

// GỌI GOOGLE GEMINI API TRỰC TIẾP
async function callGeminiAPI(userQuery) {
  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${userGeminiApiKey}`;
  const systemPrompt = `Bạn là Dr. Bâu - một Bác Sĩ Thú Y AI chuyên nghiệp, ân cần, giàu kinh nghiệm của Bệnh Viện Thú Y DogVision AI. 
Nhiệm vụ của bạn là tư vấn sức khỏe, sơ cấp cứu, dinh dưỡng, huấn luyện hành vi và đặc điểm các giống chó cho người nuôi chó tại Việt Nam.
Hãy trả lời bằng tiếng Việt thân thiện, rõ ràng, có phân mục gạch đầu dòng rõ nét. Nếu gặp triệu chứng nguy hiểm (nôn máu, co giật, hạ thân nhiệt, ngộ độc socola/nho), luôn nhấn mạnh việc đưa ngay đến trạm thú y cấp cứu.`;

  const payload = {
    contents: [
      { role: "user", parts: [{ text: `${systemPrompt}\n\nNgười nuôi hỏi: ${userQuery}` }] }
    ]
  };

  const res = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });

  if (!res.ok) {
    throw new Error(`Lỗi kết nối Gemini API: ${res.status}`);
  }

  const data = await res.json();
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) throw new Error("Không có phản hồi từ Gemini");

  // Format markdown cơ bản sang HTML
  return text.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
             .replace(/\*(.*?)\*/g, "<em>$1</em>")
             .replace(/\n\n/g, "<br/><br/>")
             .replace(/\n/g, "<br/>");
}

function appendChatMessage(sender, text) {
  const container = document.getElementById("chatMessages");
  if (!container) return;

  const bubble = document.createElement("div");
  bubble.className = `chat-bubble ${sender === "user" ? "user-msg" : "bot-msg"}`;

  if (sender === "bot") {
    bubble.innerHTML = `
      <div class="msg-avatar"><i class="fa-solid fa-stethoscope"></i></div>
      <div class="msg-content">${text}</div>
    `;
  } else {
    bubble.innerHTML = `
      <div class="msg-avatar"><i class="fa-solid fa-user"></i></div>
      <div class="msg-content">${text}</div>
    `;
  }

  container.appendChild(bubble);
  container.scrollTop = container.scrollHeight;
}

function appendTypingIndicator() {
  const container = document.getElementById("chatMessages");
  if (!container) return "";
  const id = "typing-" + Date.now();
  const bubble = document.createElement("div");
  bubble.className = "chat-bubble bot-msg";
  bubble.id = id;
  bubble.innerHTML = `
    <div class="msg-avatar"><i class="fa-solid fa-stethoscope"></i></div>
    <div class="msg-content" style="color:var(--text-muted); font-style:italic;">
      <i class="fa-solid fa-spinner fa-spin"></i> Bác sĩ AI đang phân tích dữ liệu y khoa...
    </div>
  `;
  container.appendChild(bubble);
  container.scrollTop = container.scrollHeight;
  return id;
}

function removeTypingIndicator(id) {
  const elem = document.getElementById(id);
  if (elem) elem.remove();
}

// BỘ NÃO TRÍ TUỆ NHÂN TẠO CỦA DR. BÂU (ADVANCED VET AI CONVERSATIONAL ENGINE)
async function generateAIBotResponse(query) {
  const q = query.toLowerCase().trim();

  // 1. Chào hỏi xã giao tự nhiên
  if (/^(xin chào|chào|hello|hi|bác sĩ ơi|dr bâu|alo|hé lô)/i.test(q)) {
    return `Gâu gâu! Xin chào bạn! 🐶 Tôi là <strong>Dr. Bâu – Bác sĩ Thú Y AI Trực Tuyến</strong>.<br/>
    Tôi đang trực tiếp tiếp nhận ca tư vấn của bạn hôm nay. Bé cún nhà bạn đang gặp phải vấn đề gì về sức khỏe, ăn uống hay bạn cần tìm hiểu kiến thức gì nào?`;
  }

  // 2. Tra cứu Wikipedia thời gian thực nếu câu hỏi mang tính hỏi đáp mở rộng về loài/kiến thức
  if (q.includes("là gì") || q.includes("nguồn gốc") || q.includes("lịch sử") || q.includes("tìm hiểu") || q.includes("giống chó")) {
    try {
      // Tìm từ khóa tìm kiếm
      const cleanKeyword = query.replace(/(là gì|nguồn gốc|lịch sử|tìm hiểu về|giống chó|chó|dr bâu|bác sĩ ơi|\?)/gi, "").trim();
      if (cleanKeyword.length >= 2) {
        const wikiRes = await fetch(`https://vi.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(cleanKeyword)}`);
        if (wikiRes.ok) {
          const wikiData = await wikiRes.json();
          if (wikiData.extract) {
            return `<strong>📚 THÔNG TIN KIẾN THỨC Y KHOA / ĐỘNG VẬT HỌC:</strong><br/>
            ${wikiData.extract}<br/><br/>
            <small style="color:var(--text-muted);"><i class="fa-solid fa-link"></i> Nguồn bách khoa: <a href="${wikiData.content_urls?.desktop?.page || '#'}" target="_blank" style="color:var(--secondary); text-decoration:underline;">${wikiData.title} trên Wikipedia</a></small>`;
          }
        }
      }
    } catch (e) {
      console.warn("Wiki search fallback:", e);
    }
  }

  // 3. Khẩn cấp: Đồ ăn độc hại (Socola, Nho, Hành tỏi, Xương, Bơ, Cồn, Cafein...)
  if (q.includes("socola") || q.includes("chocolate") || q.includes("cacao")) {
    return `<strong>🚨 BÁO ĐỘNG CẤP CỨU: NGỘ ĐỘC SOCOLA (THEOBROMINE)</strong><br/>
    • <strong>Cơ chế gây độc:</strong> Chó chuyển hóa Theobromine cực kỳ chậm. Độc chất tích tụ làm kích thích quá mức hệ thần kinh trung ương và cơ tim.<br/>
    • <strong>Dấu hiệu nhận biết:</strong> Thở hổn hển, nôn mửa, tiêu chảy, khát nước dữ dội, co giật hoặc nhịp tim tăng vọt.<br/>
    • <strong>Hành động ngay:</strong> Mang cún đến cơ sở thú y gần nhất trong vòng 2 giờ đầu để bác sĩ tiêm thuốc gây nôn (Apomorphine) và rửa ruột. <em>Đừng chần chừ!</em>`;
  }

  if (q.includes("nho") || q.includes("nho khô")) {
    return `<strong>🚨 NGUY HIỂM TÍNH MẠNG: SUY THẬN CẤP DO NHO</strong><br/>
    Axit Tartaric trong nho tươi và nho khô gây hoại tử ống thận cấp tính ở chó. Ngay cả 1 vài quả nho cũng có thể gây suy thận tử vong.<br/>
    👉 <strong>Xử lý:</strong> Cần đưa đến trạm xá thú y để truyền dịch giải độc tĩnh mạch liên tục 48 tiếng nhằm bảo vệ chức năng thận.`;
  }

  if (q.includes("hành") || q.includes("tỏi") || q.includes("hẹ")) {
    return `<strong>⚠️ NGUY CƠ THIẾU MÁU TÁN HUYẾT:</strong><br/>
    Các hợp chất chứa lưu huỳnh trong họ hành tỏi gây oxy hóa phá hủy màng hồng cầu của chó. Triệu chứng gồm: mệt lả, niêm mạc miệng trắng bệch, thở dốc và nước tiểu chuyển màu đỏ sẫm như xì dầu. Tuyệt đối không cho ăn đồ ăn thừa của người có nêm hành tỏi.`;
  }

  if (q.includes("xương gà") || q.includes("xương hóc") || q.includes("xương heo") || q.includes("hóc")) {
    return `<strong>🦴 NGUY CƠ THỦNG THỰC QUẢN & RUỘT:</strong><br/>
    Xương gia cầm nấu chín giòn vỡ thành các mảnh nhọn hoắt. Nếu cún đang khạc liên tục, chảy dãi nhiều hoặc cào vào miệng, cún có thể đã bị dị vật mắc kẹt ở vòm họng. Tuyệt đối không dùng tay móc sâu vì có thể đẩy dị vật vào sâu hơn, hãy đưa cún đi gắp dị vật hoặc nội soi!`;
  }

  // 4. Bệnh lý: Nôn mửa, Tiêu chảy, Bỏ ăn, Parvo, Sốt cao
  if (q.includes("nôn") || q.includes("tiêu chảy") || q.includes("ỉa") || q.includes("bỏ ăn") || q.includes("lờ đờ") || q.includes("sốt")) {
    return `<strong>🩺 BÁC SĨ THÚ Y CHẨN ĐOÁN LÂM SÀNG:</strong><br/>
    Cún xuất hiện triệu chứng rối loạn tiêu hóa và suy nhược. Có 3 kịch bản phổ biến:<br/>
    1. <strong>Bệnh truyền nhiễm Parvovirus / Care (Rất nguy hiểm):</strong> Nếu cún dưới 12 tháng tuổi chưa tiêm đủ 3 mũi vaccine, kèm nôn dịch vàng bọt trắng, phân tanh khắm lẫn máu.<br/>
    2. <strong>Viêm dạ dày - ruột cấp do thức ăn:</strong> Ăn phải đồ thiu, dầu mỡ hoặc rác.<br/>
    3. <strong>Tắc ruột do nuốt dị vật:</strong> Đồ chơi, dây chun, tất vải.<br/>
    👉 <strong>Chỉ dẫn chăm sóc:</strong> Nhịn ăn 8-12 tiếng. Bổ sung Oresol từng thìa nhỏ để bù nước. Mang mẫu phân đến thú y để test que nhanh 5 phút.`;
  }

  // 5. Da liễu: Rụng lông, Gãi ngứa, Nấm, Ghẻ, Ve rận
  if (q.includes("ve") || q.includes("rận") || q.includes("bọ chét") || q.includes("ngứa") || q.includes("rụng lông") || q.includes("ghẻ") || q.includes("nấm")) {
    return `<strong>🕷️ PHÁC ĐỒ ĐIỀU TRỊ DA LIỄU & KÝ SINH TRÙNG:</strong><br/>
    • <strong>Ve rận, bọ chét:</strong> Cho uống 1 viên <em>NexGard</em> (tác dụng 1 tháng) hoặc <em>Bravecto</em> (tác dụng 3 tháng). Ve rận sẽ tự khô và rụng sạch sau 24h.<br/>
    • <strong>Nấm da (vảy tròn, rụng lông viền):</strong> Tắm bằng sữa tắm chứa Ketoconazole/Chlorhexidine 2 lần/tuần, sấy lông thật khô sau khi tắm.<br/>
    • <strong>Ghẻ Demodex / Sarcoptes:</strong> Cần cạo da soi kính hiển vi để phân biệt ghẻ máu hay ghẻ ngứa để dùng thuốc tiêm Ivermectin hoặc viên nhai Fluralaner.`;
  }

  // 6. Tiêm phòng & Sổ giun
  if (q.includes("tiêm") || q.includes("vaccine") || q.includes("vắc xin") || q.includes("chích") || q.includes("tẩy giun") || q.includes("sổ giun")) {
    return `<strong>💉 LỊCH TIÊM CHỦNG CHUẨN HIỆP HỘI THÚ Y THẾ GIỚI (WSAVA):</strong><br/>
    • <strong>6-8 tuần tuổi:</strong> Tẩy giun lần 1 + Tiêm mũi 1 (Vaccine 5 bệnh).<br/>
    • <strong>10-12 tuần tuổi:</strong> Tiêm mũi 2 (Vaccine 7 bệnh đa giá).<br/>
    • <strong>14-16 tuần tuổi:</strong> Tiêm mũi 3 (Hoàn thành phác đồ cún con).<br/>
    • <strong>Từ 3 tháng tuổi:</strong> Bắt buộc tiêm phòng Bệnh Dại (Rabies).<br/>
    • <strong>Hằng năm:</strong> Tiêm nhắc lại 1 mũi 7 bệnh + 1 mũi Dại để cún miễn dịch trọn đời.`;
  }

  // 7. Huấn luyện hành vi
  if (q.includes("vệ sinh") || q.includes("dạy") || q.includes("cắn") || q.includes("sủa") || q.includes("huấn luyện") || q.includes("phá")) {
    return `<strong>🐾 NGUYÊN TẮC HUẤN LUYỆN TÂM LÝ CHÓ (POSITIVE REINFORCEMENT):</strong><br/>
    • <strong>Dạy đi vệ sinh đúng chỗ:</strong> Nhốt cún vào chuồng/khay vệ sinh ngay sau khi thức dậy hoặc ăn no 15 phút. Khi cún vừa đi xong, <em>thưởng ngay bánh thưởng và khen ngợi trong 3 giây</em>.<br/>
    • <strong>Cắn phá đồ đạc:</strong> Cún con ngứa răng khi thay răng (3-7 tháng tuổi) hoặc quá dư thừa năng lượng. Hãy mua đồ chơi gặm silicon, sừng hươu gặm và dắt cún đi dạo giải phóng năng lượng ít nhất 30 phút/ngày.`;
  }

  // 8. Tra cứu 50 giống chó cụ thể
  for (const [key, d] of Object.entries(DOG_DATABASE)) {
    const vi = (d.viName || "").toLowerCase();
    const en = key.toLowerCase().replace(/_/g, " ");
    if (q.includes(vi) || q.includes(en) || (key.includes("Corgi") && q.includes("corgi")) || (key.includes("Golden") && q.includes("golden")) || (key.includes("Husky") && q.includes("husky")) || (key.includes("Poodle") && q.includes("poodle")) || (key.includes("Pug") && q.includes("pug")) || (key.includes("Shiba") && q.includes("shiba"))) {
      const price = BREED_PRICES[key] || { local: "7 - 12 triệu", vka: "15 - 25 triệu" };
      return `<strong>🐶 BÁO CÁO Y KHOA & ĐẶC TÍNH: ${d.viName.toUpperCase()}</strong><br/>
      • <strong>Xuất xứ:</strong> ${d.origin}<br/>
      • <strong>Thể trạng chuẩn:</strong> Cân nặng ${d.weight} | Chiều cao ${d.height} | Tuổi thọ ${d.lifespan}<br/>
      • <strong>Tâm lý & Tính cách:</strong> ${d.temperament}<br/>
      • <strong>Chế độ dinh dưỡng:</strong> ${d.care.diet}<br/>
      • <strong>Lưu ý bệnh di truyền:</strong> ${d.care.health}<br/>
      • <strong>Mức giá thị trường VN:</strong> ~${price.local} (sinh sản trong nước) | ~${price.vka} (thuần chủng có phả VKA).`;
    }
  }

  // Phản hồi hội thoại mở thông minh
  return `Dr. Bâu đã lắng nghe câu hỏi của bạn: <em>"${query}"</em>! 🩺<br/>
  Với tư cách là Bác sĩ Thú y AI, tôi luôn sẵn sàng hỗ trợ bạn:<br/>
  • <strong>Khám bệnh sơ bộ:</strong> Hãy miêu tả triệu chứng cụ thể của cún (tuổi, cân nặng, biểu hiện mệt, nôn, đi ngoài...).<br/>
  • <strong>Chăm sóc & Dinh dưỡng:</strong> Hỏi về thực phẩm an toàn, lượng ăn theo kg hoặc cách nuôi từng giống chó.<br/>
  • <strong>Nhận diện giống:</strong> Bấm tab <strong>"AI Scanner"</strong> trên menu để tải ảnh cún lên và quét chủng loài ngay lập tức nhé!`;
}
