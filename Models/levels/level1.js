let level1;
function initLevel() {
    level1 =  new Level(
    [
    new Chicken(900),
    new smallChicken(900),
    new Chicken(1400), 
    new smallChicken(1700), 
    new Chicken(1900),
    new smallChicken(2200), 
    new Chicken(2400),
    new smallChicken(2700), 
    new Chicken(2900),
    new smallChicken(3200),   
    new Chicken(3400),
    new EndBoss()
    ],
    [
        new Cloud(100),
        new Cloud(500),
        new Cloud(900),
        new Cloud(1400),
        new Cloud(1900),
        new Cloud(2300),
        new Cloud(2700),
        new Cloud(3200),
        new Cloud(3600),
        new Cloud(4000)
    ],
    [
        new BackgroundObjects('img/5_background/layers/air.png', -719),
        new BackgroundObjects('img/5_background/layers/3_third_layer/2.png', -719),
        new BackgroundObjects('img/5_background/layers/2_second_layer/2.png', -719),
        new BackgroundObjects('img/5_background/layers/1_first_layer/2.png', -719),
        new BackgroundObjects('img/5_background/layers/air.png', 0),
        new BackgroundObjects('img/5_background/layers/3_third_layer/1.png', 0),
        new BackgroundObjects('img/5_background/layers/2_second_layer/1.png', 0),
        new BackgroundObjects('img/5_background/layers/1_first_layer/1.png', 0),
        new BackgroundObjects('img/5_background/layers/air.png', 719),
        new BackgroundObjects('img/5_background/layers/3_third_layer/2.png', 719),
        new BackgroundObjects('img/5_background/layers/2_second_layer/2.png', 719),
        new BackgroundObjects('img/5_background/layers/1_first_layer/2.png', 719),

        new BackgroundObjects('img/5_background/layers/air.png', 1438),
        new BackgroundObjects('img/5_background/layers/3_third_layer/1.png', 1438),
        new BackgroundObjects('img/5_background/layers/2_second_layer/1.png', 1438),
        new BackgroundObjects('img/5_background/layers/1_first_layer/1.png', 1438),

        new BackgroundObjects('img/5_background/layers/air.png', 2157),
        new BackgroundObjects('img/5_background/layers/3_third_layer/2.png', 2157),
        new BackgroundObjects('img/5_background/layers/2_second_layer/2.png', 2157),
        new BackgroundObjects('img/5_background/layers/1_first_layer/2.png', 2157),

        new BackgroundObjects('img/5_background/layers/air.png', 2876),
        new BackgroundObjects('img/5_background/layers/3_third_layer/1.png', 2876),
        new BackgroundObjects('img/5_background/layers/2_second_layer/1.png', 2876),
        new BackgroundObjects('img/5_background/layers/1_first_layer/1.png', 2876),

        new BackgroundObjects('img/5_background/layers/air.png', 3595),
        new BackgroundObjects('img/5_background/layers/3_third_layer/2.png', 3595),
        new BackgroundObjects('img/5_background/layers/2_second_layer/2.png', 3595),
        new BackgroundObjects('img/5_background/layers/1_first_layer/2.png', 3595),       
    ],
    [
        new colletabelBottleLeft(400),
        new colletabelBottleLeft(1800),   
        new colletabelBottleLeft(3100)  
    ],
    [
        new colletabelBottlRight(1100),
        new colletabelBottlRight(2500)
    ], 
     [
        new colletabelCoin(500, 120),
        new colletabelCoin(1200, 130),
        new colletabelCoin(1900, 200),
        new colletabelCoin(2600, 150),
        new colletabelCoin(3200, 170)
    ]
);
}  