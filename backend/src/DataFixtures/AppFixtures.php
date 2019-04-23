<?php

namespace App\DataFixtures;

use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\Persistence\ObjectManager;
use App\Entity\Event;

class AppFixtures extends Fixture
{
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

    }


    private function convertSecondsToDate(string $date) : \DateTime
    {
        $dateAsInt = intval($date);
        $dateTime = new \DateTime();
        $dateTime->setTimestamp($dateAsInt);
        echo $dateTime->format('U = Y-m-d H:i:s') . "n";
        return $dateTime;
    }

}
