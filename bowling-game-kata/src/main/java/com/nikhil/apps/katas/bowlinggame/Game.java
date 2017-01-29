package com.nikhil.apps.katas.bowlinggame;

public class Game {
    private int[] rolls = new int[21];
    private int currentRoll = -1;

    public Game() {

    }

    /**
     * Represents a single roll in the game.
     * @param pins The number of pins that were knocked down in the roll
     */
    public void roll(int pins) {
        rolls[++currentRoll] = pins;
    }

    /**
     * The Game Score
     * @return
     */
    public int score() {
        int score = 0, frameIndex=0;

        for(int frame=0; frame<10; frame++) {
            if(isStrike(frameIndex)) {
                score += 10 + strikeBonus(frameIndex);
                frameIndex += 1;
            } else if(isSpare(frameIndex)) {
                score += 10 + spareBonus(frameIndex);
                frameIndex += 2;
            } else {
                score += sumOfPinsKnockedDownInFrame(frameIndex);
                frameIndex += 2;
            }
        }

        return score;
    }

    private boolean isStrike(int frameIndex) {
        return rolls[frameIndex] == 10;
    }

    private int sumOfPinsKnockedDownInFrame(int frameIndex) {
        return rolls[frameIndex] + rolls[frameIndex+1];
    }

    private boolean isSpare(int frameIndex) {
        return rolls[frameIndex] + rolls[frameIndex+1] == 10;
    }

    private int strikeBonus(int frameIndex) {
        return rolls[frameIndex + 1] +
                rolls[frameIndex + 2];
    }

    private int spareBonus(int frameIndex) {
        return rolls[frameIndex+2];
    }
}