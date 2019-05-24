<?php

namespace App\DataFixtures;

use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\Persistence\ObjectManager;
use App\Entity\Event;
use App\Entity\User;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;

class AppFixtures extends Fixture
{

    //encoder could not be passed directly to the load() function (Because the Fixture class doesnt implement it),
    //but you can pass it to the constructor and the global $encoder
    private $encoder;

    public function __construct(UserPasswordEncoderInterface $encoder)
    {
        $this->encoder = $encoder;
    }


    public function load(ObjectManager $manager)
    {
        //Dev Purposes -> Creating Test Data in the DB

        for ($i = 0; $i < 12; $i++){
            $event = new Event();
            $event->setTitle('Fortbildung' . $i);
            $event->setDescription('Beschreibung für Fortbildung'.$i);
            $event->setStartDate($this->convertSecondsToDate(1554990928 + $i *200000)); //Date in seconds
            $event->setEndDate($this->convertSecondsToDate(1554990928 + $i*400000));    //Date in seconds
            $manager->persist($event);
            $manager->flush();
        }

        //USER:
            // Token holen via:
            // curl -X POST -H "Content-Type: application/json" http://docker-backend.test/api/login_check -d '{"username":"admin@admin.com","password":"1111"}'

        $user = new User();
        $user->setEmail('admin@admin.com');
        $user->setFirstName('admin');
        $user->setRoles(['ROLE_USER']);
        $user->setPassword(
            //encode the password
            $this->encoder->encodePassword($user, '1111')
        );
        $manager->persist($user);
        $manager->flush();

        for ($i = 0; $i < 3; $i++){
            $user = new User();
            $user->setEmail('user' . $i . '@user.com');
            $user->setFirstName('firstName'.$i);
            $user->setRoles(['ROLE_USER']);
            $user->setPassword(
            //encode the password
                $this->encoder->encodePassword($user, $i."".$i."".$i."")
            );
            $manager->persist($user);
            $manager->flush();
        }

    }


    private function convertSecondsToDate(string $date) : \DateTime
    {
        $dateAsInt = intval($date);
        $dateTime = new \DateTime();
        $dateTime->setTimestamp($dateAsInt);
        //echo $dateTime->format('U = Y-m-d H:i:s') . "n";
        return $dateTime;
    }

}
