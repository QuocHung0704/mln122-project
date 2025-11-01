// DỮ LIỆU ĐƯỢC TRÍCH XUẤT VÀ PHÂN TÍCH TỪ FILE PDF (MLN122 - Final exam chapter 1-6)
// Bộ dữ liệu này chứa 100 câu hỏi đầu tiên.
// Đáp án đúng (isCorrect: true) được xác định bằng kiến thức chuyên môn.

export const FLASHCARD_DATA = [
    {
      question: 'Câu 1. Thuật ngữ "kinh tế- chính trị" được sử dụng lần đầu tiên vào năm nào?',
      options: [
        { text: "1610", isCorrect: false },
        { text: "1612", isCorrect: false },
        { text: "1615", isCorrect: true },
        { text: "1618", isCorrect: false }
      ],
      correctAnswer: "1615"
    },
    {
      question: 'Câu 2. Ai là người đầu tiên đưa ra khái niệm "kinh tế- chính trị"?',
      options: [
        { text: "Antoine Montchretiên", isCorrect: true },
        { text: "Francois Quesney", isCorrect: false },
        { text: "Tomas Mun", isCorrect: false },
        { text: "William Petty", isCorrect: false }
      ],
      correctAnswer: "Antoine Montchretiên"
    },
    {
      question: "Câu 3. Ai là người được C. Mác coi là sáng lập ra kinh tế chính trị tư sản cổ điển?",
      options: [
        { text: "A. Smith", isCorrect: false },
        { text: "D. Ricardo", isCorrect: false },
        { text: "W.Petty", isCorrect: true },
        { text: "R.T.Mathus", isCorrect: false }
      ],
      correctAnswer: "W.Petty"
    },
    {
      question: "Câu 4. Ai là người được coi là nhà kinh tế thời kỳ công trường thủ công?",
      options: [
        { text: "W. Petty", isCorrect: false },
        { text: "A. Smith", isCorrect: true },
        { text: "D.Ricardo", isCorrect: false },
        { text: "R.T.Mathus", isCorrect: false }
      ],
      correctAnswer: "A. Smith"
    },
    {
      question: "Câu 5. D.Ricardo là nhà kinh tế của thời kỳ nào?",
      options: [
        { text: "Thời kỳ tích luỹ nguyên thuỷ TBCN", isCorrect: false },
        { text: "Thời kỳ hiệp tác giản đơn", isCorrect: false },
        { text: "Thời kỳ công trường thủ công", isCorrect: false },
        { text: "Thời kỳ đại công nghiệp cơ khí", isCorrect: true }
      ],
      correctAnswer: "Thời kỳ đại công nghiệp cơ khí"
    },
    {
      question: "Câu 6. Kinh tế- chính trị Mác - Lênin đã kế thừa và phát triển trực tiếp những thành tựu của:",
      options: [
        { text: "Chủ nghĩa trọng thương", isCorrect: false },
        { text: "Kinh tế chính trị cổ điển Anh", isCorrect: true },
        { text: "Chủ nghĩa trọng nông", isCorrect: false },
        { text: "Kinh tế- chính trị tầm thường", isCorrect: false }
      ],
      correctAnswer: "Kinh tế chính trị cổ điển Anh"
    },
    {
      question: "Câu 7. Học thuyết kinh tế nào của C.Mác được coi là hòn đá tảng?",
      options: [
        { text: "Học thuyết giá trị lao động", isCorrect: false },
        { text: "Học thuyết tích luỹ tư sản", isCorrect: false },
        { text: "Học thuyết giá trị thặng dư", isCorrect: true },
        { text: "Học thuyết tái sản xuất tư bản", isCorrect: false }
      ],
      correctAnswer: "Học thuyết giá trị thặng dư"
    },
    {
      question: "Câu 8. Đối tượng nghiên cứu của kinh tế- chính trị Mác-Lênin là:",
      options: [
        { text: "Sản xuất của cải vật chất", isCorrect: false },
        { text: "Quan hệ xã hội giữa người với người", isCorrect: false },
        { text: "Quan hệ sản xuất trong mối quan hệ tác động qua lại với lực lượng sản xuất và kiến trúc thượng tầng.", isCorrect: true },
        { text: "Quá trình sản xuất, phân phối, trao đổi, tiêu dùng.", isCorrect: false }
      ],
      correctAnswer: "Quan hệ sản xuất trong mối quan hệ tác động qua lại với lực lượng sản xuất và kiến trúc thượng tầng."
    },
    {
      question: "Câu 9. Hãy chọn phương án đúng về đặc điểm của quy luật kinh tế:",
      options: [
        { text: "Mang tính khách quan", isCorrect: false },
        { text: "Mang tính chủ quan", isCorrect: false },
        { text: "Phát huy tác dụng thông qua hoạt động kinh tế của con người", isCorrect: false },
        { text: "Cả a và c", isCorrect: true } // Đáp án đúng là 'd' (a và c)
      ],
      correctAnswer: "Cả a và c"
    },
    {
      question: "Câu 10. Chọn phương án đúng về quy luật kinh tế và chính sách kinh tế:",
      options: [
        { text: "Quy luật kinh tế là cơ sở của chính sách kinh tế", isCorrect: false },
        { text: "Chính sách kinh tế là hoạt động chủ quan của nhà nước trên cơ sở nhận thức và vận dụng các quy luật khách quan.", isCorrect: false },
        { text: "Quy luật kinh tế và chính sách kinh tế đều phụ thuộc vào các điều kiện khách quan.", isCorrect: false },
        { text: "Cả a, b, c", isCorrect: true }
      ],
      correctAnswer: "Cả a, b, c"
    },
    {
      question: "Câu 11. Để nghiên cứu kinh tế- chính trị Mác- Lênin có thể sử dụng nhiều phương pháp, phương pháp nào quan trọng nhất?",
      options: [
        { text: "Trừu tượng hoá khoa học", isCorrect: true },
        { text: "Phân tích và tổng hợp", isCorrect: false },
        { text: "Mô hình hoá", isCorrect: false },
        { text: "Điều tra thống kê", isCorrect: false }
      ],
      correctAnswer: "Trừu tượng hoá khoa học"
    },
    {
      question: "Câu 12. Khi nghiên cứu phương thức sản xuất TBCN, C.Mác bắt đầu từ:",
      options: [
        { text: "Sản xuất của cải vật chất", isCorrect: false },
        { text: "Lưu thông hàng hoá", isCorrect: false },
        { text: "Sản xuất giá trị thặng dư", isCorrect: false },
        { text: "Sản xuất hàng hoá giản đơn và hàng hoá", isCorrect: true }
      ],
      correctAnswer: "Sản xuất hàng hoá giản đơn và hàng hoá"
    },
    {
      question: "Câu 13. Trừu tượng hoá khoa học là:",
      options: [
        { text: "Gạt bỏ những bộ phận phức tạp của đối tượng nghiên cứu.", isCorrect: false },
        { text: "Gạt bỏ các hiện tượng ngẫu nhiên, bề ngoài, chỉ giữ lại những mối liên hệ phổ biến mang tính bản chất.", isCorrect: false },
        { text: "Quá trình đi từ cụ thể đến trừu tượng và ngược lại.", isCorrect: false },
        { text: "Cả b và c", isCorrect: true } // Đáp án đúng là 'd' (b và c)
      ],
      correctAnswer: "Cả b và c"
    },
    {
      question: "Câu 14. Chức năng nhận thức của kinh tế- chính trị là nhằm:",
      options: [
        { text: "Phát hiện bản chất của các hiện tượng và quá trình kinh tế.", isCorrect: false },
        { text: "Sự tác động giữa quan hệ sản xuất với lực lượng sản xuất và kiến trúc thượng tầng.", isCorrect: false },
        { text: "Tìm ra các quy luật kinh tế", isCorrect: false },
        { text: "Cả a, b, c", isCorrect: true }
      ],
      correctAnswer: "Cả a, b, c"
    },
    {
      question: "Câu 15. Chức năng phương pháp luận của kinh tế- chính trị Mác- Lênin thể hiện ở:",
      options: [
        { text: "Trang bị phương pháp để xem xét thế giới nói chung", isCorrect: false },
        { text: "Là nền tảng lý luận cho các khoa học kinh tế ngành", isCorrect: false },
        { text: "Là cơ sở lý luận cho các khoa học nằm giáp ranh giữa các tri thức các ngành khác nhau.", isCorrect: false },
        { text: "Cả b và c", isCorrect: true }
      ],
      correctAnswer: "Cả b và c"
    },
    {
      question: "Câu 16. Chức năng tư tưởng của kinh tế- chính trị Mác – Lê nin thể hiện ở:",
      options: [
        { text: "Góp phần xây dựng thế giới quan cách mạng của giai cấp công nhân", isCorrect: false },
        { text: "Tạo niềm tin vào thắng lợi trong cuộc đấu tranh xoá bỏ áp bức bóc lột", isCorrect: false },
        { text: "Là vũ khí tư tưởng của giai cấp công nhân và nhân dân lao động trong công cuộc xây dựng CNXH", isCorrect: false },
        { text: "Cả a, b và c", isCorrect: true }
      ],
      correctAnswer: "Cả a, b và c"
    },
    {
      question: "Câu 17. Bản chất khoa học và cách mạng của kinh tế - chính trị Mác- Lênin thể hiện ở chức năng nào?",
      options: [
        { text: "Nhận thức", isCorrect: false },
        { text: "Tư tưởng", isCorrect: false },
        { text: "Phương pháp luận", isCorrect: false },
        { text: "Cả a, b và c", isCorrect: true }
      ],
      correctAnswer: "Cả a, b và c"
    },
    {
      question: "Câu 18. Hoạt động nào của con người được coi là cơ bản nhất và là cơ sở của đời sống xã hội?",
      options: [
        { text: "Hoạt động chính trị", isCorrect: false },
        { text: "Hoạt động khoa học", isCorrect: false },
        { text: "Hoạt động sản xuất của cải vật chất", isCorrect: true },
        { text: "Hoạt động nghệ thuật, thể thao", isCorrect: false }
      ],
      correctAnswer: "Hoạt động sản xuất của cải vật chất"
    },
    {
      question: "Câu 19. Để xem xét, giải thích nguồn gốc sâu xa của các hiện tượng kinh tế- xã hội phải xuất phát từ:",
      options: [
        { text: "Từ hệ tư tưởng của giai cấp thống trị", isCorrect: false },
        { text: "Từ các hoạt động kinh tế", isCorrect: true },
        { text: "Từ truyền thống lịch sử", isCorrect: false },
        { text: "Từ ý thức xã hội", isCorrect: false }
      ],
      correctAnswer: "Từ các hoạt động kinh tế"
    },
    {
      question: "Câu 20. Quá trình sản xuất là sự kết hợp của các yếu tố:",
      options: [
        { text: "Sức lao động với công cụ lao động", isCorrect: false },
        { text: "Lao động với tư liệu lao động", isCorrect: false },
        { text: "Sức lao động với đối tượng lao động và tư liệu lao động", isCorrect: true },
        { text: "Lao động với đối tượng lao động và tư liệu lao động", isCorrect: false }
      ],
      correctAnswer: "Sức lao động với đối tượng lao động và tư liệu lao động"
    },
    {
      question: 'Câu 21. "Những thời đại kinh tế khác nhau không phải ở chỗ chúng sản xuất ra cái gì, mà là ở chỗ chúng sản xuất bằng cách nào, với những tư liệu lao động nào". Câu nói trên là của ai?',
      options: [
        { text: "A. Smith", isCorrect: false },
        { text: "D.Ricardo", isCorrect: false },
        { text: "C.Mác", isCorrect: true },
        { text: "Ph.Ăng ghen", isCorrect: false }
      ],
      correctAnswer: "C.Mác"
    },
    {
      question: "Câu 22. Sức lao động là:",
      options: [
        { text: "Toàn bộ thể lực và trí lực trong một con người đang sống và được vận dụng để sản xuất ra giá trị sử dụng nào đó.", isCorrect: false },
        { text: "Khả năng lao động, được tiêu dùng trong quá trình sản xuất.", isCorrect: false },
        { text: "Hoạt động có mục đích của con người để tạo ra của cải.", isCorrect: false },
        { text: "Cả a và b.", isCorrect: true }
      ],
      correctAnswer: "Cả a và b."
    },
    {
      question: "Câu 23. Lao động sản xuất có đặc trưng cơ bản là:",
      options: [
        { text: "Hoạt động cơ bản nhất, là phẩm chất đặc biệt của con người", isCorrect: false },
        { text: "Là hoạt động có mục đích, có ý thức của con người", isCorrect: false },
        { text: "Là sự tiêu dùng sức lao động trong hiện thực", isCorrect: false },
        { text: "Cả a, b và c", isCorrect: true }
      ],
      correctAnswer: "Cả a, b và c"
    },
    {
      question: "Câu 24. Lao động sản xuất có vai trò gì đối với con người?",
      options: [
        { text: "Tạo ra của cải vật chất để nuôi sống con người", isCorrect: false },
        { text: "Phát triển, hoàn thiện con người cả về thể lực và trí lực", isCorrect: false },
        { text: "Giúp con người tích luỹ kinh nghiệm, chế tạo ra công cụ sản xuất ngày càng tinh vi", isCorrect: false },
        { text: "Cả a, b, c.", isCorrect: true }
      ],
      correctAnswer: "Cả a, b, c."
    },
    {
      question: "Câu 25. Đối tượng lao động là:",
      options: [
        { text: "Các vật có trong tự nhiên", isCorrect: false },
        { text: "Những vật mà lao động của con người tác động vào nhằm thay đổi nó cho phù hợp với mục đích của con người", isCorrect: true },
        { text: "Những vật dùng để truyền dẫn sức lao động của con người", isCorrect: false },
        { text: "Cả a, b, c", isCorrect: false }
      ],
      correctAnswer: "Những vật mà lao động của con người tác động vào nhằm thay đổi nó cho phù hợp với mục đích của con người"
    },
    {
      question: "Câu 26. Chọn ý đúng trong các ý dưới đây:",
      options: [
        { text: "Mọi nguyên liệu đều là đối tượng lao động", isCorrect: false },
        { text: "Mọi đối tượng lao động đều là nguyên liệu", isCorrect: false },
        { text: "Nguyên liệu là đối tượng lao động của các ngành công nghiệp chế biến", isCorrect: false },
        { text: "Cả a và c đều đúng.", isCorrect: true }
      ],
      correctAnswer: "Cả a và c đều đúng."
    },
    {
      question: "Câu 27. Tư liệu lao động gồm có:",
      options: [
        { text: "Công cụ lao động", isCorrect: false },
        { text: "Các vật để chứa đựng, bảo quản", isCorrect: false },
        { text: "Kết cấu hạ tầng sản xuất", isCorrect: false },
        { text: "Cả a, b, c", isCorrect: true }
      ],
      correctAnswer: "Cả a, b, c"
    },
    {
      question: "Câu 28. Trong tư liệu lao động, bộ phận nào quyết định đến năng suất lao động?",
      options: [
        { text: "Công cụ lao động", isCorrect: true },
        { text: "Nguyên vật liệu cho sản xuất quản", isCorrect: false },
        { text: "Các vật chứa đựng, bảo", isCorrect: false },
        { text: "Kết cấu hạ tầng sản xuất", isCorrect: false }
      ],
      correctAnswer: "Công cụ lao động"
    },
    {
      question: "Câu 29. Bộ phận nào của tư liệu lao động được coi là tiêu chí phản ánh đặc trưng phát triển của một thời đại kinh tế",
      options: [
        { text: "Công cụ lao động", isCorrect: true },
        { text: "Kết cấu hạ tầng sản xuất", isCorrect: false },
        { text: "Nhà cửa, kho bãi ... để chứa đựng, bảo quản", isCorrect: false },
        { text: "Cả a và b", isCorrect: false }
      ],
      correctAnswer: "Công cụ lao động"
    },
    {
      question: "Câu 30. Chọn ý đúng trong các ý dưới đây:",
      options: [
        { text: "Một vật là đối tượng lao động cũng có thể là tư liệu lao động", isCorrect: false },
        { text: "Một vật là tư liệu lao động cũng có thể là đối tượng lao động", isCorrect: false },
        { text: "Đối tượng lao động và tư liệu lao động kết hợp với nhau là tư liệu sản xuất", isCorrect: false },
        { text: "Cả a, b, c đều đúng", isCorrect: true }
      ],
      correctAnswer: "Cả a, b, c đều đúng"
    },
    {
      question: "Câu 31. Trong tư liệu lao động, bộ phận nào cần được phát triển đi trước một bước so với đầu tư sản xuất trực tiếp?",
      options: [
        { text: "Công cụ sản xuất", isCorrect: false },
        { text: "Các bộ phận chứa đựng, bảo quản", isCorrect: false },
        { text: "Kết cấu hạ tầng sản xuất", isCorrect: true },
        { text: "Cả a và c", isCorrect: false }
      ],
      correctAnswer: "Kết cấu hạ tầng sản xuất"
    },
    {
      question: "Câu 32. Trong nền sản xuất lớn hiện đại, yếu tố nào giữ vai trò quyết định của quá trình lao động sản xuất?",
      options: [
        { text: "Sức lao động", isCorrect: true },
        { text: "Tư liệu sản xuất hiện đại", isCorrect: false },
        { text: "Công cụ sản xuất tiên tiến", isCorrect: false },
        { text: "Đối tượng lao động", isCorrect: false }
      ],
      correctAnswer: "Sức lao động"
    },
    {
      question: "Câu 33. Phương thức sản xuất là sự thống nhất của:",
      options: [
        { text: "Tồn tại xã hội và ý thức xã hội", isCorrect: false },
        { text: "Cơ sở hạ tầng và kiến trúc thượng tầng", isCorrect: false },
        { text: "Lực lượng sản xuất và quan hệ sản xuất", isCorrect: true },
        { text: "Cơ cấu kinh tế và kết cấu giai cấp xã hội", isCorrect: false }
      ],
      correctAnswer: "Lực lượng sản xuất và quan hệ sản xuất"
    },
    {
      question: "Câu 34. Lực lượng sản xuất biểu hiện:",
      options: [
        { text: "Quan hệ con người với tự nhiên", isCorrect: true },
        { text: "Quan hệ con người với con người", isCorrect: false },
        { text: "Quan hệ con người với tự nhiên và quan hệ người với người", isCorrect: false },
        { text: "Cả a, b, c", isCorrect: false }
      ],
      correctAnswer: "Quan hệ con người với tự nhiên"
    },
    {
      question: "Câu 35. Trong thời đại ngày nay, lực lượng sản xuất bao gồm các yếu tố nào?",
      options: [
        { text: "Người lao động", isCorrect: false },
        { text: "Tư liệu sản xuất", isCorrect: false },
        { text: "Khoa học công nghệ", isCorrect: false },
        { text: "Cả a, b, c", isCorrect: true }
      ],
      correctAnswer: "Cả a, b, c"
    },
    {
      question: "Câu 36. Yếu tố chủ thể của lực lượng sản xuất là:",
      options: [
        { text: "Tư liệu sản xuất hiện đại", isCorrect: false },
        { text: "Con người với kỹ năng, kỹ xảo và tri thức được tích luỹ lại", isCorrect: true },
        { text: "Khoa học công nghệ tiên tiến", isCorrect: false },
        { text: "Cả b và c", isCorrect: false }
      ],
      correctAnswer: "Con người với kỹ năng, kỹ xảo và tri thức được tích luỹ lại"
    },
    {
      question: "Câu 37. Quan hệ sản xuất biểu hiện:",
      options: [
        { text: "Quan hệ giữa người với tự nhiên", isCorrect: false },
        { text: "Quan hệ kinh tế giữa người với người trong quá trình sản xuất", isCorrect: true },
        { text: "Quan hệ giữa người với người trong xã hội", isCorrect: false },
        { text: "Cả a, b, c", isCorrect: false }
      ],
      correctAnswer: "Quan hệ kinh tế giữa người với người trong quá trình sản xuất"
    },
    {
      question: "Câu 38. Quan hệ sản xuất bao gồm:",
      options: [
        { text: "Quan hệ về sở hữu tư liệu sản xuất", isCorrect: false },
        { text: "Quan hệ về tổ chức quản lý sản xuất xã hội", isCorrect: false },
        { text: "Quan hệ về phân phối sản phẩm xã hội", isCorrect: false },
        { text: "Cả a, b, c", isCorrect: true }
      ],
      correctAnswer: "Cả a, b, c"
    },
    {
      question: "Câu 39. Quan hệ nào giữ vai trò quyết định trong quan hệ sản xuất:",
      options: [
        { text: "Quan hệ sở hữu", isCorrect: true },
        { text: "Quan hệ tổ chức quản lý", isCorrect: false },
        { text: "Quan hệ phân phối", isCorrect: false },
        { text: "Không quan hệ nào quyết định", isCorrect: false }
      ],
      correctAnswer: "Quan hệ sở hữu"
    },
    {
      question: "Câu 40. Quan hệ sản xuất được hình thành do:",
      options: [
        { text: "ý muốn chủ quan của con người", isCorrect: false },
        { text: "Do giai cấp thống trị quy định thành pháp luật", isCorrect: false },
        { text: "Do tính chất và trình độ phát triển của lực lượng sản xuất", isCorrect: true },
        { text: "Cả a, b, c", isCorrect: false }
      ],
      correctAnswer: "Do tính chất và trình độ phát triển của lực lượng sản xuất"
    },
    {
      question: "Câu 41. Lực lượng sản xuất và quan hệ sản xuất có quan hệ với nhau thế nào?",
      options: [
        { text: "Tác động qua lại với nhau", isCorrect: false },
        { text: "Lực lượng sản xuất quyết định quan hệ sản xuất", isCorrect: false },
        { text: "QHSX có tác động tích cực trở lại đối với lực lượng sản xuất", isCorrect: false },
        { text: "Cả a, b và c", isCorrect: true }
      ],
      correctAnswer: "Cả a, b và c"
    },
    {
      question: "Câu 42. Khi nào QHSX được xem là phù hợp với tính chất và trình độ phát triển của lực lượng sản xuất?",
      options: [
        { text: "Thúc đẩy lực lượng sản xuất phát triển", isCorrect: false },
        { text: "Cải thiện đời sống nhân dân", isCorrect: false },
        { text: "Tạo điều kiện thực hiện công bằng xã hội", isCorrect: false },
        { text: "Cả a, b, c", isCorrect: true }
      ],
      correctAnswer: "Cả a, b, c"
    },
    {
      question: "Câu 43. Các phương thức sản xuất nối tiếp nhau trong lịch sử theo trình tự nào?",
      options: [
        { text: "Cộng sản nguyên thuỷ- phong kiến- chiếm hữu nô lệ- tư bản – chủ nghĩa cộng sản", isCorrect: false },
        { text: "Cộng sản nguyên thuỷ- chiếm hữu nô lệ- phong kiến- tư bản- chủ nghĩa cộng sản", isCorrect: true },
        { text: "Chiếm hữu nô lệ - cộng sản nguyên thuỷ - phong kiến - tư bản - chủ nghĩa cộng sản", isCorrect: false },
        { text: "Cộng sản nguyên thuỷ - chiếm hữu nô lệ - tư bản - phong kiến - chủ nghĩa cộng sản", isCorrect: false }
      ],
      correctAnswer: "Cộng sản nguyên thuỷ- chiếm hữu nô lệ- phong kiến- tư bản- chủ nghĩa cộng sản"
    },
    {
      question: "Câu 44. Tái sản xuất là:",
      options: [
        { text: "Là quá trình sản xuất", isCorrect: false },
        { text: "Là quá trình sản xuất được lặp đi lặp lại và phục hồi không ngừng.", isCorrect: true },
        { text: "Là sự khôi phục lại sản xuất", isCorrect: false },
        { text: "Cả a, b, c", isCorrect: false }
      ],
      correctAnswer: "Là quá trình sản xuất được lặp đi lặp lại và phục hồi không ngừng."
    },
    {
      question: "Câu 45. Căn cứ vào đâu để phân chia thành tái sản xuất cá biệt và tái sản xuất xã hội?",
      options: [
        { text: "Căn cứ vào phạm vi sản xuất", isCorrect: true },
        { text: "Căn cứ vào tốc độ sản xuất", isCorrect: false },
        { text: "Căn cứ vào tính chất sản xuất", isCorrect: false },
        { text: "Căn cứ vào nội dung sản xuất", isCorrect: false }
      ],
      correctAnswer: "Căn cứ vào phạm vi sản xuất"
    },
    {
      question: "Câu 46. Căn cứ vào đâu để chia ra thành tái sản xuất giản đơn và tái sản xuất mở rộng?",
      options: [
        { text: "Căn cứ vào phạm vi", isCorrect: false },
        { text: "Căn cứ vào nội dung", isCorrect: false },
        { text: "Căn cứ vào tính chất", isCorrect: false },
        { text: "Căn cứ vào quy mô", isCorrect: true }
      ],
      correctAnswer: "Căn cứ vào quy mô"
    },
    {
      question: "Câu 47. Loại tái sản xuất nào làm tăng sản phẩm chủ yếu do tăng năng suất lao động và hiệu quả sử dụng các nguồn lực?",
      options: [
        { text: "Tái sản xuất giản đơn", isCorrect: false },
        { text: "Tái sản xuất mở rộng", isCorrect: false },
        { text: "Tái sản xuất mở rộng theo chiều rộng", isCorrect: false },
        { text: "Tái sản xuất mở rộng theo chiều sâu", isCorrect: true }
      ],
      correctAnswer: "Tái sản xuất mở rộng theo chiều sâu"
    },
    {
      question: "Câu 48. Chọn ý sai về tái sản xuất giản đơn và tái sản xuất mở rộng?",
      options: [
        { text: "Tái sản xuất giản đơn là đặc trưng của nền sản xuất nhỏ", isCorrect: false },
        { text: "Tái sản xuất giản đơn là việc tổ chức sản xuất đơn giản, không phức tạp", isCorrect: true },
        { text: "Tái sản xuất mở rộng là đặc trưng của nền sản xuất lớn", isCorrect: false },
        { text: "Sản phẩm thặng dư là nguồn gốc của tái sản xuất mở rộng", isCorrect: false }
      ],
      correctAnswer: "Tái sản xuất giản đơn là việc tổ chức sản xuất đơn giản, không phức tạp"
    },
    {
      question: "Câu 49. Chọn ý sai về tái sản xuất mở rộng theo chiều rộng và tái sản xuất mở rộng theo chiều sâu?",
      options: [
        { text: "Đều làm cho sản phẩm tăng lên", isCorrect: false },
        { text: "Cả hai hình thức tái sản xuất đều dựa trên cơ sở tăng năng suất lao động và hiệu quả sử dụng các yếu tố đầu vào", isCorrect: true },
        { text: "Tái sản xuất mở rộng theo chiều sâu sử dụng tài nguyên hiệu quả hơn và gây ra ô nhiễm ít hơn tái sản xuất mở rộng theo chiều rộng.", isCorrect: false },
        { text: "Cả b và c", isCorrect: false }
      ],
      correctAnswer: "Cả hai hình thức tái sản xuất đều dựa trên cơ sở tăng năng suất lao động và hiệu quả sử dụng các yếu tố đầu vào"
    },
    {
      question: "Câu 50. Xác định đúng trình tự các khâu của quá trình tái sản xuất",
      options: [
        { text: "Sản xuất - trao đổi - phân phối - tiêu dùng", isCorrect: false },
        { text: "Sản xuất - phân phối - trao đổi - tiêu dùng", isCorrect: true },
        { text: "Phân phối - trao đổi - sản xuất - tiêu dùng", isCorrect: false },
        { text: "Trao đổi - tiêu dùng - phân phối - sản xuất", isCorrect: false }
      ],
      correctAnswer: "Sản xuất - phân phối - trao đổi - tiêu dùng"
    },
    {
      question: "Câu 51. Trong 4 khâu của quá trình tái sản xuất, khâu nào giữ vai trò quyết định?",
      options: [
        { text: "Sản xuất", isCorrect: true },
        { text: "Phân phối", isCorrect: false },
        { text: "Trao đổi", isCorrect: false },
        { text: "Tiêu dùng", isCorrect: false }
      ],
      correctAnswer: "Sản xuất"
    },
    {
      question: "Câu 52. Trong các khâu của quá trình tái sản xuất, khâu nào là mục đích và là động lực?",
      options: [
        { text: "Sản xuất", isCorrect: false },
        { text: "Phân phối", isCorrect: false },
        { text: "Trao đổi", isCorrect: false },
        { text: "Tiêu dùng", isCorrect: true }
      ],
      correctAnswer: "Tiêu dùng"
    },
    {
      question: "Câu 53. Chọn đúng về quan hệ giữa sản xuất với phân phối",
      options: [
        { text: "Tồn tại độc lập với nhau", isCorrect: false },
        { text: "Phân phối thụ động, do sản xuất quyết định", isCorrect: false },
        { text: "Phân phối quyết định đến quy mô, cơ cấu của sản xuất", isCorrect: false },
        { text: "Sản xuất quyết định phân phối, phân phối có tác động tích cực đối với sản xuất.", isCorrect: true }
      ],
      correctAnswer: "Sản xuất quyết định phân phối, phân phối có tác động tích cực đối với sản xuất."
    },
    {
      question: "Câu 54. Nội dung của tái sản xuất xã hội bao gồm:",
      options: [
        { text: "Tái sản xuất của cải vật chất và QHSX", isCorrect: false },
        { text: "Tái sản xuất sức lao động và tư liệu sản xuất", isCorrect: false },
        { text: "Tái sản xuất tư liệu tiêu dùng và môi trường sinh thái", isCorrect: false },
        { text: "Tái sản xuất sức lao động, của cải vật chất, QHSX và môi trường sinh thái", isCorrect: true }
      ],
      correctAnswer: "Tái sản xuất sức lao động, của cải vật chất, QHSX và môi trường sinh thái"
    },
    {
      question: "Câu 55. Tiêu chí nào là quan trọng nhất để phân biệt các hình thái kinh tế - xã hội?",
      options: [
        { text: "Lực lượng sản xuất", isCorrect: false },
        { text: "Quan hệ sản xuất", isCorrect: true },
        { text: "Tồn tại xã hội", isCorrect: false },
        { text: "Kiến trúc thượng tầng", isCorrect: false }
      ],
      correctAnswer: "Quan hệ sản xuất"
    },
    {
      question: "Câu 56. Tăng trưởng kinh tế là:",
      options: [
        { text: "Tăng năng suất lao động", isCorrect: false },
        { text: "Tăng hiệu quả của sản xuất", isCorrect: false },
        { text: "Tăng quy mô sản lượng của nền kinh tế trong một thời kỳ nhất định", isCorrect: true },
        { text: "Sự phát triển kinh tế và tiến bộ xã hội", isCorrect: false }
      ],
      correctAnswer: "Tăng quy mô sản lượng của nền kinh tế trong một thời kỳ nhất định"
    },
    {
      question: "Câu 57. Chỉ số nào được sử dụng để tính tốc độ tăng trưởng kinh tế?",
      options: [
        { text: "Mức tăng năng suất lao động", isCorrect: false },
        { text: "Mức tăng vốn đầu tư", isCorrect: false },
        { text: "Mức tăng GDP/người", isCorrect: false },
        { text: "Mức tăng GNP hoặc GDP năm sau so với năm trước", isCorrect: true }
      ],
      correctAnswer: "Mức tăng GNP hoặc GDP năm sau so với năm trước"
    },
    {
      question: "Câu 58. Để tăng trưởng kinh tế cao, kinh tế học hiện đại nêu ra các nhân tố nào?",
      options: [
        { text: "Vốn, khoa học công nghệ và con người", isCorrect: false },
        { text: "Đất đai, tư bản và cơ cấu kinh tế", isCorrect: false },
        { text: "Cơ cấu kinh tế, thể chế chính trị và vai trò của nhà nước", isCorrect: false },
        { text: "Cả a và c", isCorrect: true }
      ],
      correctAnswer: "Cả a và c"
    },
    {
      question: "Câu 59. Chọn ý đúng về phát triển kinh tế",
      options: [
        { text: "Phát triển kinh tế là tăng trưởng kinh tế bền vững", isCorrect: false },
        { text: "Phát triển kinh tế là tăng trưởng kinh tế, hoàn thiện cơ cấu kinh tế và thể chế kinh tế.", isCorrect: false },
        { text: "Phát triển kinh tế là tăng trưởng kinh tế và nâng cao chất lượng cuộc sống", isCorrect: false },
        { text: "Phát triển kinh tế là tăng trưởng kinh tế gắn liền với hoàn thiện cơ cấu kinh tế, thể chế kinh tế và nâng cao chất lượng cuộc sống.", isCorrect: true }
      ],
      correctAnswer: "Phát triển kinh tế là tăng trưởng kinh tế gắn liền với hoàn thiện cơ cấu kinh tế, thể chế kinh tế và nâng cao chất lượng cuộc sống."
    },
    {
      question: "Câu 60. Thế nào là tăng trưởng kinh tế bền vững?",
      options: [
        { text: "Là sự tăng trưởng ổn định lâu dài và tốc độ rất cao", isCorrect: false },
        { text: "Là sự tăng trưởng tương đối cao, ổn định trong thời gian tương đối dài", isCorrect: false },
        { text: "Sự tăng trưởng gắn liền với bảo vệ môi trường sinh thái và tiến bộ xã hội", isCorrect: false },
        { text: "Cả b và c", isCorrect: true }
      ],
      correctAnswer: "Cả b và c"
    },
    {
      question: "Câu 61. Trong các nhân tố tăng trưởng kinh tế, Đảng ta xác định nhân tố nào là cơ bản của tăng trưởng nhanh và bền vững?",
      options: [
        { text: "Vốn", isCorrect: false },
        { text: "Con người", isCorrect: false },
        { text: "Khoa học và công nghệ", isCorrect: true },
        { text: "Cơ cấu kinh tế, thể chế kinh tế và vai trò nhà nước", isCorrect: false }
      ],
      correctAnswer: "Khoa học và công nghệ"
    },
    {
      question: "Câu 62. Tăng trưởng kinh tế có vai trò thế nào?",
      options: [
        { text: "Là điều kiện để khắc phục tình trạng đói nghèo, lạc hậu", isCorrect: false },
        { text: "Để tạo thêm việc làm, giảm thất nghiệp", isCorrect: false },
        { text: "Để củng cố an ninh, quốc phòng", isCorrect: false },
        { text: "Cả a, b và c", isCorrect: true }
      ],
      correctAnswer: "Cả a, b và c"
    },
    {
      question: "Câu 63. Các nhân tố nào có ảnh hưởng đến phát triển kinh tế?",
      options: [
        { text: "Lực lượng sản xuất", isCorrect: false },
        { text: "Quan hệ sản xuất", isCorrect: false },
        { text: "Kiến trúc thượng tầng", isCorrect: false },
        { text: "Cả a, b, c", isCorrect: true }
      ],
      correctAnswer: "Cả a, b, c"
    },
    {
      question: "Câu 64. Phát triển kinh tế bao gồm những nội dung nào dưới đây?",
      options: [
        { text: "Sự gia tăng của GNP, hoặc GDP và GNP hoặc GDP trên đầu người.", isCorrect: false },
        { text: "Cơ cấu kinh tế thay đổi theo hướng: tỷ trọng của công nghiệp và dịch vụ trong GNP tăng lên còn của nông nghiệp trong GNP giảm xuống.", isCorrect: false },
        { text: "Chất lượng cuộc sống của đại đa số dân cư tăng lên cả về mặt vật chất, tinh thần và môi trường sinh thái được bảo vệ.", isCorrect: false },
        { text: "Cả a, b, c", isCorrect: true }
      ],
      correctAnswer: "Cả a, b, c"
    },
    {
      question: "Câu 65. Tiến bộ xã hội được thể hiện ở những mặt nào?",
      options: [
        { text: "Tiến bộ về kinh tế", isCorrect: false },
        { text: "Tiến bộ về chính trị, xã hội", isCorrect: false },
        { text: "Đời sống văn hoá, tinh thần ngày càng được nâng cao", isCorrect: false },
        { text: "Cả a, b, c đều đúng", isCorrect: true }
      ],
      correctAnswer: "Cả a, b, c đều đúng"
    },
    {
      question: "Câu 66. Liên hợp quốc dùng chỉ số HDI làm tiêu chí đánh giá sự phát triển, sự tiến bộ của mỗi quốc gia. Chỉ số HDI gồm những tiêu chí cơ bản nào?",
      options: [
        { text: "Mức thu nhập bình quân (GDP/người)", isCorrect: false },
        { text: "Thành tựu giáo dục", isCorrect: false },
        { text: "Tuổi thọ bình quân", isCorrect: false },
        { text: "Cả a, b và c", isCorrect: true }
      ],
      correctAnswer: "Cả a, b và c"
    },
    {
      question: "Câu 67. Phát triển kinh tế và tiến bộ xã hội có quan hệ với nhau:",
      options: [
        { text: "Phát triển kinh tế là cơ sở vật chất cho tiến bộ xã hội", isCorrect: false },
        { text: "Tiến bộ xã hội thúc đẩy tăng trưởng và phát triển kinh tế", isCorrect: false },
        { text: "Thực chất là quan hệ giữa sự phát triển lực lượng sản xuất với phát triển QHSX và kiến trúc thượng tầng", isCorrect: false },
        { text: "Cả a, b và c", isCorrect: true }
      ],
      correctAnswer: "Cả a, b và c"
    },
    {
      question: "Câu 68. Chọn đúng về tăng trưởng kinh tế và phát triển kinh tế",
      options: [
        { text: "Muốn phát triển kinh tế thì cần phải tăng trưởng kinh tế", isCorrect: false },
        { text: "Có thể có tăng trưởng kinh tế nhưng không có phát triển kinh tế", isCorrect: false },
        { text: "Những nhân tố làm tăng trưởng kinh tế đều làm phát triển kinh tế", isCorrect: false },
        { text: "Cả a, b, c đều đúng", isCorrect: true }
      ],
      correctAnswer: "Cả a, b, c đều đúng"
    },
    {
      question: "Câu 69. Chọn các nội dung đúng về xã hội hoá sản xuất. Xã hội hoá sản xuất bao gồm:",
      options: [
        { text: "Xã hội hoá sản xuất về kinh tế- kỹ thuật", isCorrect: false },
        { text: "Xã hội hoá sản xuất về kinh tế - tổ chức", isCorrect: false },
        { text: "Xã hội hoá sản xuất về kinh tế - xã hội", isCorrect: false },
        { text: "Cả a, b, c", isCorrect: true }
      ],
      correctAnswer: "Cả a, b, c"
    },
    {
      question: "Câu 70. Sản xuất hàng hoá xuất hiện dựa trên:",
      options: [
        { text: "Phân công lao động cá biệt và chế độ tư hữu về tư liệu sản xuất", isCorrect: false },
        { text: "Phân công lao động chung và chế độ sở hữu khác nhau về TLSX", isCorrect: false },
        { text: "Phân công lao động và sự tách biệt về kinh tế giữa những người sản xuất", isCorrect: false },
        { text: "Phân công lao động xã hội và chế độ tư hữu hoặc những hình thức sở hữu khác nhau về TLSX", isCorrect: true }
      ],
      correctAnswer: "Phân công lao động xã hội và chế độ tư hữu hoặc những hình thức sở hữu khác nhau về TLSX"
    },
    {
      question: "Câu 71. Hàng hoá là:",
      options: [
        { text: "Sản phẩm của lao động để thoả mãn nhu cầu của con người", isCorrect: false },
        { text: "Sản phẩm của lao động có thể thoả mãn nhu cầu nào đó của con người thông qua mua bán", isCorrect: true },
        { text: "Sản phẩm ở trên thị trường", isCorrect: false },
        { text: "Sản phẩm được sản xuất ra để đem bán", isCorrect: false }
      ],
      correctAnswer: "Sản phẩm của lao động có thể thoả mãn nhu cầu nào đó của con người thông qua mua bán"
    },
    {
      question: "Câu 72. Giá trị của hàng hoá được quyết định bởi:",
      options: [
        { text: "Sự khan hiếm của hàng hoá", isCorrect: false },
        { text: "Sự hao phí sức lao động của con người", isCorrect: false },
        { text: "Lao động trừu tượng của người sản xuất kết tinh trong hàng hoá", isCorrect: true },
        { text: "Công dụng của hàng hoá", isCorrect: false }
      ],
      correctAnswer: "Lao động trừu tượng của người sản xuất kết tinh trong hàng hoá"
    },
    {
      question: "Câu 73. Quy luật giá trị có tác dụng:",
      options: [
        { text: "Điều tiết sản xuất và lưu thông hàng hoá", isCorrect: false },
        { text: "Cải tiến kỹ thuật, tăng năng suất lao động và phân hoá những người sản xuất", isCorrect: false },
        { text: "Điều tiết sản xuất, phân hoá giàu nghèo", isCorrect: false },
        { text: "Cả a và b", isCorrect: true }
      ],
      correctAnswer: "Cả a và b"
    },
    {
      question: "Câu 74. Sản xuất hàng hoá tồn tại:",
      options: [
        { text: "Trong mọi xã hội", isCorrect: false },
        { text: "Trong chế độ nô lệ, phong kiến, TBCN", isCorrect: false },
        { text: "Trong các xã hội, có phân công lao động xã hội và sự tách biệt về kinh tế giữa những người sản xuất", isCorrect: true },
        { text: "Chỉ có trong CNTB", isCorrect: false }
      ],
      correctAnswer: "Trong các xã hội, có phân công lao động xã hội và sự tách biệt về kinh tế giữa những người sản xuất"
    },
    {
      question: "Câu 75. Giá cả hàng hoá là:",
      options: [
        { text: "Giá trị của hàng hoá", isCorrect: false },
        { text: "Quan hệ về lượng giữa hàng và tiền", isCorrect: false },
        { text: "Tổng của chi phí sản xuất và lợi nhuận", isCorrect: false },
        { text: "Biểu hiện bằng tiền của giá trị hàng hoá", isCorrect: true }
      ],
      correctAnswer: "Biểu hiện bằng tiền của giá trị hàng hoá"
    },
    {
      question: "Câu 76. Quy luật giá trị là:",
      options: [
        { text: "Quy luật riêng của CNTB", isCorrect: false },
        { text: "Quy luật cơ bản của sản xuất và trao đổi hàng hoá", isCorrect: true },
        { text: "Quy luật kinh tế chung của mọi xã hội", isCorrect: false },
        { text: "Quy luật kinh tế của thời kỳ quá độ lên CNXH", isCorrect: false }
      ],
      correctAnswer: "Quy luật cơ bản của sản xuất và trao đổi hàng hoá"
    },
    {
      question: "Câu 77. Yếu tố quyết định đến giá cả hàng hoá là:",
      options: [
        { text: "Giá trị của hàng hoá", isCorrect: true },
        { text: "Quan hệ cung cầu về hàng hoá", isCorrect: false },
        { text: "Giá trị sử dụng của hàng hoá", isCorrect: false },
        { text: "Mốt thời trang của hàng hoá", isCorrect: false }
      ],
      correctAnswer: "Giá trị của hàng hoá"
    },
    {
      question: "Câu 78. Lao động trừu tượng là:",
      options: [
        { text: "Là phạm trù riêng của CNTB", isCorrect: false },
        { text: "Là phạm trù của mọi nền kinh tế hàng hoá", isCorrect: true },
        { text: "Là phạm trù riêng của kinh tế thị trường", isCorrect: false },
        { text: "Là phạm trù chung của mọi nền kinh tế", isCorrect: false }
      ],
      correctAnswer: "Là phạm trù của mọi nền kinh tế hàng hoá"
    },
    {
      question: "Câu 79. Lao động cụ thể là:",
      options: [
        { text: "Là phạm trù lịch sử", isCorrect: false },
        { text: "Lao động tạo ra giá trị của hàng hoá", isCorrect: false },
        { text: "Tạo ra giá trị sử dụng của hàng hoá", isCorrect: true },
        { text: "Biểu hiện tính chất xã hội của người sản xuất hàng hoá", isCorrect: false }
      ],
      correctAnswer: "Tạo ra giá trị sử dụng của hàng hoá"
    },
    {
      question: "Câu 80. Lượng giá trị xã hội của hàng hoá được quyết định bởi:",
      options: [
        { text: "Hao phí vật tư kỹ thuật", isCorrect: false },
        { text: "Hao phí lao động cần thiết của người sản xuất hàng hoá", isCorrect: false },
        { text: "Hao phí lao động sống của người sản xuất hàng hoá", isCorrect: false },
        { text: "Thời gian lao động xã hội cần thiết", isCorrect: true }
      ],
      correctAnswer: "Thời gian lao động xã hội cần thiết"
    },
    {
      question: "Câu 81. Lượng giá trị của đơn vị hàng hoá thay đổi:",
      options: [
        { text: "Tỷ lệ thuận với năng suất lao động", isCorrect: false },
        { text: "Tỷ lệ nghịch với cường độ lao động", isCorrect: false },
        { text: "Tỷ lệ nghịch với năng suất lao động, không phụ thuộc vào cường độ lao động", isCorrect: true },
        { text: "a và b", isCorrect: false }
      ],
      correctAnswer: "Tỷ lệ nghịch với năng suất lao động, không phụ thuộc vào cường độ lao động"
    },
    {
      question: "Câu 82. Lượng giá trị của đơn vị hàng hoá thay đổi:",
      options: [
        { text: "Tỷ lệ nghịch với thời gian lao động xã hội cần thiết và năng suất lao động", isCorrect: false },
        { text: "Tỷ lệ thuận với thời gian lao động xã hội cần thiết", isCorrect: false },
        { text: "Tỷ lệ nghịch với năng suất lao động", isCorrect: false },
        { text: "Cả b và c", isCorrect: true }
      ],
      correctAnswer: "Cả b và c"
    },
    {
      question: "Câu 83. Lượng giá trị của đơn vị hàng hoá:",
      options: [
        { text: "Tỷ lệ thuận với cường độ lao động", isCorrect: false },
        { text: "Tỷ lệ nghịch với cường độ lao động", isCorrect: false },
        { text: "Không phụ thuộc vào cường độ lao động", isCorrect: true },
        { text: "Cả a, b và c", isCorrect: false }
      ],
      correctAnswer: "Không phụ thuộc vào cường độ lao động"
    },
    {
      question: "Câu 84. Chọn đúng về tăng năng suất lao động: Khi tăng năng suất lao động thì:",
      options: [
        { text: "Số lượng hàng hoá làm ra trong 1 đơn vị thời gian tăng", isCorrect: false },
        { text: "Tổng giá trị của hàng hoá không thay đổi", isCorrect: false },
        { text: "Giá trị 1 đơn vị hàng hoá giảm xuống", isCorrect: false },
        { text: "Cả a, b và c", isCorrect: true }
      ],
      correctAnswer: "Cả a, b và c"
    },
    {
      question: "Câu 85. Chọn ý đúng về tăng cường độ lao động: khi cường độ lao động tăng lên thì:",
      options: [
        { text: "Số lượng hàng hoá làm ra trong một đơn vị thời gian tăng lên", isCorrect: true },
        { text: "Số lượng lao động hao phí trong thời gian đó không thay đổi", isCorrect: false },
        { text: "Giá trị 1 đơn vị hàng hoá giảm đi", isCorrect: false },
        { text: "Cả a, b và c", isCorrect: false }
      ],
      correctAnswer: "Số lượng hàng hoá làm ra trong một đơn vị thời gian tăng lên"
    },
    {
      question: "Câu 86. Khi đồng thời tăng năng suất lao động và cường độ lao động lên 2 lần thì ý nào dưới đây là đúng?",
      options: [
        { text: "Tổng số hàng hoá tăng lên 4 lần, tổng số giá trị hàng hoá tăng lên 4 lần", isCorrect: false },
        { text: "Tổng số giá trị hàng hoá tăng 2 lần, tổng số hàng hoá tăng 2 lần", isCorrect: false },
        { text: "Giá trị 1 hàng hoá giảm 2 lần, tổng số giá trị hàng hoá tăng 2 lần", isCorrect: true },
        { text: "Tổng số hàng hoá tăng lên 2 lần, giá trị 1 hàng hoá giảm 2 lần.", isCorrect: false }
      ],
      correctAnswer: "Giá trị 1 hàng hoá giảm 2 lần, tổng số giá trị hàng hoá tăng 2 lần"
    },
    {
      question: "Câu 87. Hai hàng hoá trao đổi được với nhau vì:",
      options: [
        { text: "Chúng cùng là sản phẩm của lao động", isCorrect: false },
        { text: "Có lượng thời gian hao phí lao động xã hội cần thiết để sản xuất ra chúng bằng nhau", isCorrect: false },
        { text: "Có lượng hao phí vật tư kỹ thuật bằng nhau", isCorrect: false },
        { text: "Cả a và b", isCorrect: true }
      ],
      correctAnswer: "Cả a và b"
    },
    {
      question: "Câu 88. Giá trị sử dụng là gì?",
      options: [
        { text: "Là công dụng của vật có thể thoả mãn nhu cầu nào đó của con người", isCorrect: false },
        { text: "Là tính hữu ích của vật", isCorrect: false },
        { text: "Là thuộc tính tự nhiên của vật", isCorrect: false },
        { text: "Cả a, b và c", isCorrect: true }
      ],
      correctAnswer: "Cả a, b và c"
    },
    {
      question: "Câu 89. Số lượng giá trị sử dụng phụ thuộc các nhân tố nào?",
      options: [
        { text: "Những điều kiện tự nhiên", isCorrect: false },
        { text: "Trình độ khoa học công nghệ", isCorrect: false },
        { text: "Chuyên môn hoá sản xuất", isCorrect: false },
        { text: "Cả a, b và c", isCorrect: true }
      ],
      correctAnswer: "Cả a, b và c"
    },
    {
      question: "Câu 90. Yếu tố nào được xác định là thực thể của giá trị hàng hoá?",
      options: [
        { text: "Lao động cụ thể", isCorrect: false },
        { text: "Lao động trừu tượng", isCorrect: true },
        { text: "Lao động giản đơn", isCorrect: false },
        { text: "Lao động phức tạp", isCorrect: false }
      ],
      correctAnswer: "Lao động trừu tượng"
    },
    {
      question: "Câu 91. Giá trị hàng hoá được tạo ra từ đâu?",
      options: [
        { text: "Từ sản xuất", isCorrect: true },
        { text: "Từ phân phối", isCorrect: false },
        { text: "Từ trao đổi", isCorrect: false },
        { text: "Cả sản xuất, phân phối và trao đổi", isCorrect: false }
      ],
      correctAnswer: "Từ sản xuất"
    },
    {
      question: "Câu 92. Tính chất hai mặt của lao động sản xuất hàng hoá là:",
      options: [
        { text: "Lao động tư nhân và lao động xã hội", isCorrect: false },
        { text: "Lao động giản đơn và lao động phức tạp", isCorrect: false },
        { text: "Lao động cụ thể và lao động trừu tượng", isCorrect: true },
        { text: "Lao động quá khứ và lao động sống", isCorrect: false }
      ],
      correctAnswer: "Lao động cụ thể và lao động trừu tượng"
    },
    {
      question: "Câu 93. Ai là người phát hiện ra tính chất hai mặt của lao động sản xuất hàng hoá?",
      options: [
        { text: "A.Smith", isCorrect: false },
        { text: "D.Ricardo", isCorrect: false },
        { text: "C.Mác", isCorrect: true },
        { text: "Ph. Ăng ghen", isCorrect: false }
      ],
      correctAnswer: "C.Mác"
    },
    {
      question: "Câu 94. Lao động cụ thể là:",
      options: [
        { text: "Là những việc làm cụ thể", isCorrect: false },
        { text: "Là lao động có mục đích cụ thể", isCorrect: false },
        { text: "Là lao động ở các ngành nghề cụ thể", isCorrect: false },
        { text: "Là lao động ngành nghề, có mục đích riêng, đối tượng riêng, công cụ lao động riêng và kết quả riêng", isCorrect: true }
      ],
      correctAnswer: "Là lao động ngành nghề, có mục đích riêng, đối tượng riêng, công cụ lao động riêng và kết quả riêng"
    },
    {
      question: "Câu 95. Lao động cụ thể là:",
      options: [
        { text: "Nguồn gốc của của cải", isCorrect: true },
        { text: "Nguồn gốc của giá trị", isCorrect: false },
        { text: "Nguồn gốc của giá trị trao đổi", isCorrect: false },
        { text: "Cả a, b và c", isCorrect: false }
      ],
      correctAnswer: "Nguồn gốc của của cải"
    },
    {
      question: 'Câu 96. "Lao động là cha, còn đất là mẹ của mọi của cải". Câu nói này là của ai?',
      options: [
        { text: "W.Petty", isCorrect: true },
        { text: "A.Smith", isCorrect: false },
        { text: "D. Ricardo", isCorrect: false },
        { text: "C.Mác", isCorrect: false }
      ],
      correctAnswer: "W.Petty"
    },
    {
      question: 'Câu 97. "Lao động là cha, còn đất là mẹ của mọi của cải". Khái niệm lao động trong câu này là lao động gì?',
      options: [
        { text: "Lao động giản đơn", isCorrect: false },
        { text: "Lao động phức tạp", isCorrect: false },
        { text: "Lao động cụ thể", isCorrect: true },
        { text: "Lao động trừu tượng", isCorrect: false }
      ],
      correctAnswer: "Lao động cụ thể"
    },
    {
      question: "Câu 98. Lao động trừu tượng là gì?",
      options: [
        { text: "Là lao động không cụ thể", isCorrect: false },
        { text: "Là lao động phức tạp", isCorrect: false },
        { text: "Là lao động có trình độ cao, mất nhiều công đào tạo", isCorrect: false },
        { text: "Là sự hao phí sức lao động của người sản xuất hàng hoá nói chung không tính đến những hình thức cụ thể.", isCorrect: true }
      ],
      correctAnswer: "Là sự hao phí sức lao động của người sản xuất hàng hoá nói chung không tính đến những hình thức cụ thể."
    },
    {
      question: "Câu 99. Lao động trừu tượng là nguồn gốc:",
      options: [
        { text: "Của tính hữu ích của hàng hoá", isCorrect: false },
        { text: "Của giá trị hàng hoá", isCorrect: true },
        { text: "Của giá trị sử dụng", isCorrect: false },
        { text: "Cả a, b, c", isCorrect: false }
      ],
      correctAnswer: "Của giá trị hàng hoá"
    },
    {
      question: "Câu 100. Thế nào là lao động giản đơn?",
      options: [
        { text: "Là lao động làm công việc đơn giản", isCorrect: false },
        { text: "Là lao động làm ra các hàng hoá chất lượng không cao", isCorrect: false },
        { text: "Là lao động chỉ làm một công đoạn của quá trình tạo ra hàng hoá", isCorrect: false },
        { text: "Là lao động không cần trải qua đào tạo cũng có thể làm được", isCorrect: true }
      ],
      correctAnswer: "Là lao động không cần trải qua đào tạo cũng có thể làm được"
    }
  ];