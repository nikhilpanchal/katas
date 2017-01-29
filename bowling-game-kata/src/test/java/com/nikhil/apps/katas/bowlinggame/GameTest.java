package com.nikhil.apps.katas.bowlinggame;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

/**
 * Created by nikhilpanchal on 1/29/17.
 */
class GameTest {
    Game game;

    @BeforeEach
    void setUp() {
        game = new Game();
    }

    @Test
    public void whenAllRollsGoIntoTheGutter_ThenTheScoreShouldBeZero() {
        rollMany(0, 20);

        assertEquals(0, game.score());
    }

    @Test
    public void whenAllRollsKnockDown1Pin_ThenTheScoreShouldBeTwenty() {
        rollMany(1, 20);

        assertEquals(20, game.score());
    }

    @Test
    public void whenOneSpareRollIsThrown_ThenTheScoreShouldUpdateProperty() {
        rollSpare();
        game.roll(3);

        rollMany(0, 17);

        assertEquals(16, game.score());
    }

    @Test
    public void whenAStrikeOccursInTheFirstFrameAndTheNextFrameThrowsSeven_ThenScoreShouldBeTwentyFour() {
        rollStrike();          // Strike

        game.roll(3);
        game.roll(4);

        rollMany(0, 16);

        assertEquals(24, game.score());
    }

    @Test
    public void whenThePerfectGameIsRolled_TheScoreShouldBeThreeHundred() {
        rollMany(10, 12);

        assertEquals(300, game.score());
    }

    private void rollMany(int pins, int rolls) {
        for (int i = 0; i < rolls; i++) {
            game.roll(pins);
        }
    }

    private void rollStrike() {
        game.roll(10);
    }

    private void rollSpare() {
        game.roll(5);
        game.roll(5);
    }
}