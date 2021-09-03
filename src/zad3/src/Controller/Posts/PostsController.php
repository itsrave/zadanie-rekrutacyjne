<?php

namespace App\Controller\Posts;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class PostsController extends AbstractController
{
    #[Route('/posts', name: 'posts')]
    public function index(): Response
    {
        return $this->render('posts/index.html.twig', [
            'controller_name' => 'PostsController',
        ]);
    }

    #[Route('/posts/edit/{id}', name: 'posts_edit')]
    public function edit(): Response
    {
        return $this->render('posts/edit.html.twig', [
            'controller_name' => 'PostsController',
        ]);
    }
}
