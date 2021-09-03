<?php
declare(strict_types=1);

use PHPUnit\Framework\TestCase;

class PeselValidatorTest extends TestCase
{
    private PeselValidator $validator;

    protected function setUp(): void
    {
        $this->validator = new PeselValidator();
    }

    /**
     * @dataProvider validDataProvider
     */
    public function test_Should_Success_When_PeselIsValid($pesel): void
    {
        $this->validator->setPesel($pesel);
        $this->assertTrue($this->validator->validate());
    }

    /**
     * @dataProvider invalidDataProvider
     */
    public function test_Should_Success_When_PeselIsInvalid($pesel): void
    {
        $this->validator->setPesel($pesel);
        $this->assertFalse($this->validator->validate());
    }

    public function validDataProvider(): array
    {
        return [
            [
                '91110572529',
                '05210722856',
                '71011176691',
                '94123147939',
                '63082569256',
                '66011243432',
                '61043092612',
                '62042583231',
                '53031862967',
                '79022824422',
            ],
        ];
    }

    public function invalidDataProvider(): array
    {
        return [
            [
                '23123713133312312321',
                '31251106214',
                'qwertyuiopa',
                '123',
                '!@#$%^&*()-',
            ],
        ];
    }
}
