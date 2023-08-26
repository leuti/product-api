INSERT INTO categories (name) 
VALUES 
('Literature'),
('Kitchen'),
('Outdoor'),
('Food & Beverages'),
('Gardening'),
('Office');


INSERT INTO users (login, first_name, last_name) 
VALUES 
('test_user', 'test_first_name', 'test_last_name'),
('user1', 'hello', 'user1'),
('user2', 'hello', 'user2');

INSERT INTO products (title, description, image_file, price, category_id) 
VALUES 
('Crampon', 'The king of crampons used for climbing mountains all around the world. It has 12 points, 8 of which in the front and 4 in the back, allowing a perfect stability and performance in all snow and ice conditions. Equipped with Cramp-o-matic, new matic, new classic, multimatic systems, they are adjustable and adapt to any type of boot. Equipped with the famous Grivel proactive Antibott both in the front and the rear. A crampon that makes strength and reliability of its strongest points', 'crapons.jpg', 144.99, 3),
('Rope 7mm', 'Teufelberger and new england ropes created the multi-purpose line Polyester Accessory Cord to offer the best of both worlds. Polyester resists water, has less stretch than nylon, has super vibrant colors and greater UV resistance than nylon cords. Polyester is also more durable and its lower stretch offers more abrasion resistance.
The Polyester Accessory Cords carry both UIAA 102 and EN 564 certification. They are definitely "must haves" for almost all applications where a small static cord is needed. Therefore they are perfectly suited for balancing anchors or creating self-equalizers as well as stringing your accessories. Polyester Accessory Cords are available in 3mm through 8mm sizes and various lengths in complementary light and dark versions.', 'rope.jpg', 199.99, 3),
('Harness', 'The Rock Xplorer Is A Robust, Comfortable All-Rounder.Its Salewa Evobelt Design Combines The Flexibility Of A Floating Waist Belt With Comfortable, Breathable 3D Mesh Fixed Padding To Ensure That Your Harness And Its (Four) Gear Loops Remain Correctly Centred.With Dual 90Safx Buckles At The Waist Belt And Leg Loops For Full Adjustability And Softer Rear Gear Loops To Allow You To Climb Comfortably When Carrying A Pack.', 'harnes.jpg', 51.99, 3),
('Catch-22 - Joseph Heller', 'But the enemy above is not Yossarians problem - it is his own army intent on keeping him airborne, and the maddening "Catch-22" that allows for no possibility of escape.No book has satirised military madness so hilariously and tragically.', 'catch22', 14.95, 1),
('Timber', 'Sawn softwood timber pressure treated to enhance resistance to rot, insect and fungal attack. Ideal framing timber for a multitude of end uses.', 'timber.jpg', 35, 5),
('Milk', 'Milk is the liquid produced by the mammary glands of mammals, including humans. Breast milk is the preferred food for infants, as it is well-tolerated while their digestive tracts develop and mature. Dairy milk may be introduced at later ages if tolerated well.', 'milk.jpg', 1.5, 2),
('Pen', 'Steel Blue Ballpoint Pen - Limited Edition', 'pen.png', 47, 6);

INSERT INTO orders (user_id, status) 
VALUES 
(1, 'Ordered'),
(2, 'Cancelled'),
(1, 'Finished'),
(1, 'Ordered'),
(1, 'Ordered');

INSERT INTO order_products (order_id, product_id, quantity)
VALUES
(1, 1, 100),
(1, 2, 500),
(1, 3, 1),
(1, 4, 10),
(2, 3, 100),
(3, 3, 100),
(4, 4, 2),
(5, 5, 1),
(5, 6, 100);

