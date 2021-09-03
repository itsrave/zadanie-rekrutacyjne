<?php
declare(strict_types=1);

class PeselValidator
{
    protected string $pesel;

    private const MULTIPLIERS = [1, 3, 7, 9, 1, 3, 7, 9, 1, 3];

    public function validate(): bool
    {
        if ($this->checkForOnlyNumbersAndLength() && $this->checksumValidation()) {
            return true;
        }

        return false;
    }

    public function checkForOnlyNumbersAndLength(): bool
    {
        if (preg_match('/^^[0-9]{11}$/', $this->pesel)) {
            return true;
        }

        return false;
    }

    public function checksumValidation(): bool
    {
        $sum = 0;

        foreach (self::MULTIPLIERS as $index => $multiplier) {
            $sum += $multiplier * $this->pesel[$index];
        }

        $lastNumber = $sum % 10;
        $checkSum = ($lastNumber === 0) ? 0 : 10 - $lastNumber;

        if ((string) $checkSum === $this->pesel[10]) {
            return true;
        }

        return false;
    }

    public function getPesel(): string
    {
        return $this->pesel;
    }

    public function setPesel(string $pesel): void
    {
        $this->pesel = $pesel;
    }
}
