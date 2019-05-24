<?php

namespace App\Services;


use App\Entity\User;
use App\DTO\User\UserDTO;
use App\DTO\User\UserAssembler;
use Doctrine\Common\Persistence\ObjectManager;
use Doctrine\ORM\EntityNotFoundException;   //Exceptionhandling #1
//use Symfony\Component\HttpFoundation\Request;
use App\Repository\UserRepository;


final class UserService
{

    /**
     * @var ObjectManager
     */
    private $entityManager;


    /**
     * @var ObjectRepository
     */
    private $userRepository;

    /**
     * @var UserAssembler
     */
    private $userAssembler;


    /**
     * UserService constructor.
     * @param ObjectManager $entityManager
     * @param UserRepository $userRepository
     */
    public function __construct(
        ObjectManager $entityManager,
        UserRepository $userRepository,
        UserAssembler $userAssembler
    )
    {
        $this->entityManager = $entityManager;
        $this->userRepository  = $userRepository ;
        $this->userAssembler = $userAssembler;
    }



    /**
     * Creates an User resource
     * @param User $user
     */
    public function persist(User $user)
    {
        $this->entityManager->persist($user);
        $this->entityManager->flush();
    }

    //Exceptionhandling #2
    /**
     * @param int $userID
     * @return User
     * @throws EntityNotFoundException
     */
    public function get(int $userID) :User
    {
        $user = $this->userRepository->find($userID);
        if (!$user) {
            throw new EntityNotFoundException('User with id '.$userID.' does not exist!');
        }
        return $user;
    }

    /**
     * @return object[]
     */
    public function getAll()
    {
        return $this->userRepository->findAll();
    }


    /**
     * @param UserDTO $userDTO
     * @return User
     */
    public function create(UserDTO $userDTO):User
    {
        $user = $this->userAssembler->createUser($userDTO);
        return $user;
    }


    /**
     * @param UserDTO $userDTO
     * @param int $userID
     * @return User
     */
    public function update(UserDTO $userDTO, int $userID):User
    {
        $user = $this->get($userID);
        if ($user) {
            $user = $this->userAssembler->updateUser($user,$userDTO);
        }
        return $user;
    }


    /**
     * Removes an User
     * @param User $user
     */
    public function remove(User $user)
    {
        $this->entityManager->remove($user);
        $this->entityManager->flush();
    }




}