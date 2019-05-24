<?php

namespace App\Controller\Rest;

use App\Services\UserService;
use FOS\RestBundle\Controller\FOSRestController;
use FOS\RestBundle\Controller\Annotations as Rest;
use function MongoDB\BSON\toJSON;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use App\Entity\Event; //TODO: raus?
use FOS\RestBundle\View\View;
use App\DTO\User\UserDTO;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;
use App\Entity\User;

class UserController extends FOSRestController {


    /**
     * @var UserService
     */
    private $userService;

    /**
     * UserController constructor.
     * @param UserService $userService
     */
    public function __construct(UserService $userService)
    {
        $this->userService = $userService;
    }



    //Test via Browser-URL:
    // http://rest-tutorial.test/api/users/user/3
    /**
     * Retrieves an User resource
     * @Rest\Get("/users/{userID}")
     * @param int $userId
     * @return View
     * @throws \Doctrine\ORM\EntityNotFoundException
     */
    public function getUse(int $userID): View
    {
        $user = $this->userService->get($userID);
        return View::create($user, Response::HTTP_OK);
    }


    //Test via Browser-URL:
    // http://rest-backend.test/api/users/list

    /**
     * Retrieves a collection of User resource
     * @Rest\Get("/users")
     * @return view
     */
    public function getEvens(): View
    {
        $users = $this->userService->getAll();
        return View::create($users, Response::HTTP_OK);
    }

    /**
     * Creates new user resource in database
     * @Rest\Post("/admin/users")
     * @ParamConverter("userDTO", converter="fos_rest.request_body")
     * @param userDTO $userDTO
     * @return view
     */
    public function addUser (UserDTO $userDTO): View
    {
        $user = $this->userService->create($userDTO);
        $this->userService->persist($user);
        return View::create($user, Response::HTTP_CREATED);
    }

    //Test via terminal:
    // curl -i -X PUT -H 'Content-Type: application/json' -d '{"title": "Updated Title", "content": "updated Content"}' http://rest-tutorial.test/api/users/4

    /**
     * updates a users resource
     * @Rest\Put("/admin/users/{userID}")
     * @ParamConverter("userDTO", converter="fos_rest.request_body")
     * @param UserDTO $userDTO
     * @throws \Doctrine\ORM\EntityNotFoundException
     * @return view
     */
    public function updateUser(UserDTO $userDTO, int $userID): View
    {
        $user = $this->userService->update($userDTO,$userID);
        $this->userService->persist($user);
        return View::create($user, Response::HTTP_OK);
    }


    //Test Delete -> Terminal:
    // curl -i -X DELETE http://rest-tutorial.test/api/users/3

    /**
     * deletes a user resource
     * @Rest\Delete("/admin/users/{userID}")
     * @throws \Doctrine\ORM\EntityNotFoundException
     * @return view
     */
    public function deleteUser(int $userID): View
    {
        $user = $this->userService->get($userID);
        $this->userService->remove($user);
        return View::create($user, Response::HTTP_NO_CONTENT);
    }



    /**
     * empty implementation for the OPTIONS STUFF
     * @Rest\Options("/users")
     */
    public function options(){}


}