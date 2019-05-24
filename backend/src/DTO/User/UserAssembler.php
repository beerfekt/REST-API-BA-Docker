<?php
/**
 * convert from your DTO to your Entity, and from your Entity to your DTO
 *  filling out the missing fields, if any
 */

namespace App\DTO\User;

use App\Entity\User;
use Symfony\Component\Validator\Constraints\DateTime;


final class UserAssembler
{


    public function readDTO(UserDTO $userDTO, ?User $user = null): User
    {
        if (!$user) {
            $user = new User();
        }
        $user->setEmail($userDTO->getEmail());
        $user->setFirstName($userDTO->getFirstName());
        $user->setRoles($userDTO->getRoles());
        $user->setPassword($userDTO->getPassword());
        return $user;
    }


    public function updateUser(User $user, UserDTO $userDTO): User
    {
        return $this->readDTO($userDTO, $user);
    }

    //TODO: WriteDTO(..) ??

    public function createUser(UserDTO $userDTO): User
    {
        return $this->readDTO($userDTO);
    }

}