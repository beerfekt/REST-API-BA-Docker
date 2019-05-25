<?php
/**
 * Immutable Data Transfer object between application Layers
 */

namespace App\DTO\User;


final class UserDTO
{
    private $email;
    private $firstName;
    private $roles;
    private $password;

    public function __construct(string $email,
                                string $firstName,
                                array $roles,
                                string $password)
    {
        $this->email = $email;
        $this->firstName = $firstName;
        $this->roles = $roles;
        $this->password = $password;
    }

    public function getEmail(): string
    {
        return $this->email;
    }

    public function getFirstName(): string
    {
        return $this->firstName;
    }

    public function getRoles(): array
    {
        return $this->roles;
    }

    public function getPassword(): string
    {
        return $this->password;
    }

}