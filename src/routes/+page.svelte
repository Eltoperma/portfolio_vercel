<script lang="ts">
	import * as Avatar from "$lib/components/ui/avatar/index.js";
  import * as Accordion from "$lib/components/ui/accordion/index.js";
	import { Button } from '$lib/components/ui/button';
  import Background from '$lib/components/ui/Background.svelte';    

  </script>
  <!-- <Background className="mt-24" /> -->
    <div class="p-4 flex flex-row justify-between m-auto  max-h-[600px] max-w-[800px]">
      
      <div class="w-1/2 from-slate-400 to-transparent" >
        <h2 class="font-semibold text-2xl">Wer bin ich?</h2>
        <p class="whitespace-normal pt-4">Ich bin Tjark Hüter, gebürtiger Kieler und absolviere zurzeit mein duales Studium zum Wirtschaftsinformatiker. Nebst Erfahrungen von der Arbeit bei freenet DLS suche ich noch Erfahrungen in Hobbyprojekten, sei es Programmieren, Film, Ton, Schnitt oder einfach mal 'ne Runde Fahrradfahren.</p>
      </div>
      <div class="w-1/2 min-h-[160px] min-w-[160px]">
        <Avatar.Root>
          <Avatar.Image  src="pfp.jpg" alt="@Tjark Hüter" />
          <Avatar.Fallback>Tjark Hüter</Avatar.Fallback>
        </Avatar.Root>
      </div>
    </div>
    <div class="m-auto max-w-[800px] p-4 mt-8 bg-white dark:bg-slate-800 shadow-2xl rounded-md">
      <h3 class="text-xl">Skills</h3>
      <Accordion.Root class="w-full sm:max-w-[70%]">
        <Accordion.Item class="dark:border-b-slate-600" value="item-1">
          <Accordion.Trigger>Sprachen</Accordion.Trigger>
          <Accordion.Content
          ><ul>
            <li><img src="icons/brit.svg" alt="- ">Englisch</li>
            <li><img src="icons/c.svg" alt="- ">C#</li>
            <li><img src="icons/java.svg" alt="- ">Java</li>
            <li><img src="icons/html.svg" alt="- ">HTML</li>
            <li><img src="icons/css.svg" alt="- ">CSS</li>
            <li><img src="icons/js.svg" alt="- ">Javascript</li>
            <li><img src="icons/typescript.svg" alt="- ">Typescript</li>
            <li><img src="icons/pyth.svg" alt="- ">python</li>
          </ul>
          </Accordion.Content
          >
        </Accordion.Item>
        <Accordion.Item class="dark:border-b-slate-600" value="item-2">
          <Accordion.Trigger>Frameworks</Accordion.Trigger>
          <Accordion.Content>
            <ul>
              <li><img src="icons/svelte.svg" alt="- ">Svelte/Kit</li>
              <li><img src="icons/prisma.svg" alt="- ">Prisma</li>
              <li><img src="icons/tailwind.svg" alt="- ">Tailwind</li>
              <li><img src="icons/brit.svg" alt="- ">Wordpress</li>
              <li><img src="icons/net.svg" alt="- ">.NET</li>
              <li><img src="icons/flutter.svg" alt="- ">Flutter</li>
            </ul>
          </Accordion.Content>
        </Accordion.Item>
        <Accordion.Item class="dark:border-b-slate-600" value="item-3">
          <Accordion.Trigger>Fachentnisse</Accordion.Trigger>
          <Accordion.Content>
            <ul>
              <li><img src="icons/photoshop.svg" alt="- ">Photoshop</li>
              <li><img src="icons/photoshop.svg" alt="- ">Lightroom</li>
              <li><img src="icons/indesign.svg" alt="- ">Indesign</li>
              <li><img src="icons/illustrator.svg" alt="- ">Illustrator</li>
              <li><img src="icons/cam.svg" alt="- ">Photographie</li>
              <li><img src="icons/filmcam.svg" alt="- ">Videographie</li>
              <li><img src="icons/micro.svg" alt="- ">Audiotechnik & Recording</li>
              <li><img src="icons/davinci.svg" alt="- ">Ton-/Videoschnitt und nachbearbeitung</li>
            </ul>
          </Accordion.Content>
        </Accordion.Item>
      </Accordion.Root>
    </div>
    <div class="m-auto mt-8 max-w-[800px] p-4 rounded-md whitespace-normal">
      <h3 class="text-xl mb-2">Interesse an Kontakt?</h3>
      <p>Dann erreichen sie mich unter meiner E-Mail: <a class="underline text-blue-700" href="mailto:tjarkhueter@gmail.com">tjarkhueter@gmail.com</a> oder indem sie mir über das Kontaktformular eine Nachricht zukommen lassen.</p>
      <div class="flex justify-center">
        <Button class="m-auto mt-8" href="/Kontakt">Zum Kontaktformular</Button>
      </div>
    </div>
    <!-- <div class="h-[50px]"></div> -->
    
      <style>
        li img {
          width: 1rem;
          height: 1rem;
          display: inline;
          margin-right: 0.2rem;
        }
      </style>
      <svelte:head>
        <title>Moin Moin!</title>
        <!-- Wichtige Meta-Tags -->
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta name="description" content="Willkommen auf der persönlichen Webseite von Tjark Hüter. Hier erfahren Sie mehr über meinen beruflichen Hintergrund, sehen mein Portfolio und können mit mir Kontakt aufnehmen.">
        <meta name="keywords" content="Tjark Hüter, Portfolio, Kontakt, beruflicher Hintergrund, Fähigkeiten, Erfahrung">
        <meta name="author" content="Tjark Hüter">

        <!-- Open Graph Meta-Tags -->
        <meta property="og:title" content="Tjark Hüters persönliche Webseite">
        <meta property="og:description" content="Erfahren Sie mehr über Tjark Hüters berufliche Laufbahn, sehen Sie das Portfolio und finden Sie Kontaktinformationen.">
        <meta property="og:type" content="website">
        <meta property="og:url" content="https://www.tjarkhueter.de">
        <meta property="og:image" content="https://www.tjarkhueter.de/pfp.jpg">

        <!-- Zusätzliche Meta-Tags -->
        <meta name="robots" content="index, follow">
        <meta name="theme-color" content="#000000">

      </svelte:head>