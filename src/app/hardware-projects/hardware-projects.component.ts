import { Component, OnInit } from '@angular/core';

// import { PHOTOS } from '../hardware-gallery';

class Slide {
  url: string;
  title: string;
  alt: string;
  description: string;
}

class Device {
  url: string;
  description: string;
}

class Photo {
  url: string;
  description: string;
}


@Component({
  selector: 'app-hardware-projects',
  templateUrl: './hardware-projects.component.html',
  styleUrls: ['./hardware-projects.component.css']
})
export class HardwareProjectsComponent implements OnInit {
  photos = PHOTOS;
  devices = DEVICES;
  slides = SLIDES;
  constructor() { }

  ngOnInit() {
    
  }

}


export const SLIDES: Slide[] = [
  {
    url: '../../assets/images/hardware-projects/subway-kharkov.jpg',
    title: 'Kharkov subway',
    alt: 'Kharkov subway',
    description: 'Ticket and card vending machines in Kharkov underground station'
  },
  {
    url: '../../assets/images/hardware-projects/subway-baku.jpg',
    title: 'Baku subway',
    alt: 'Baku subway',
    description: 'Card vending machines and turnstiles in Baku underground station'
  },
  {
    url: '../../assets/images/hardware-projects/control-room-baku.jpg',
    title: 'Control room in Baku subway',
    alt: 'Control room in Baku subway',
    description: 'Station operator work place'
  },
  {
    url: '../../assets/images/hardware-projects/subway-erevan.jpg',
    title: 'Erevan subway',
    alt: 'Erevan subway',
    description: 'Turnstiles in Erevan underground station'
  },
  {
    url: '../../assets/images/hardware-projects/bus-ticket-validator.jpg',
    title: 'Bus fare collection system',
    alt: 'Bus fare collection system',
    description: 'Validator for bus passengers'
  },
  {
    url: '../../assets/images/hardware-projects/turnstiles-baku.jpg',
    title: 'Turnstiles with flaps',
    alt: 'Turnstiles with flaps',
    description: 'Turnstiles in Baku underground station'
  },
]


export const DEVICES: Device[] = [
  {
    url: '../../assets/images/hardware-gallery/eclipse.jpg',
    description: 'Eclipse'
  },
  {
    url: '../../assets/images/hardware-gallery/cayman.jpg',
    description: 'Cayman'
  },
  {
    url: '../../assets/images/hardware-gallery/irbis.jpg',
    description: 'Irbis'
  },
  {
    url: '../../assets/images/hardware-gallery/lottoll.jpg',
    description: 'Lottoll'
  },
  {
    url: '../../assets/images/hardware-gallery/scrm-100.jpg',
    description: 'SCRM-100'
  },
  {
    url: '../../assets/images/hardware-gallery/scrm-bs 200.jpg',
    description: 'SCRM-200'
  },
  // ---------------------------------------------------------------------------------------
  {
    url: '../../assets/images/hardware-gallery/parking.jpg',
    description: 'Parking'
  },
  {
    url: '../../assets/images/hardware-gallery/cvm.jpg',
    description: 'CVM'
  },
  {
    url: '../../assets/images/hardware-gallery/tivm.jpg',
    description: 'TIVM'
  },
  {
    url: '../../assets/images/hardware-gallery/sct-01.jpg',
    description: 'SCT-01'
  },
  {
    url: '../../assets/images/hardware-gallery/scv-01.jpg',
    description: 'SCV-01'
  },
  {
    url: '../../assets/images/hardware-gallery/scc-01.jpg',
    description: 'SCC-01'
  }
]



export const PHOTOS: Photo[] = [
  {
    url: '../../assets/images/hardware-gallery/bars-poland.jpg',
    description: 'Ski resort'
  },
  {
    url: '../../assets/images/hardware-gallery/turnstiles-spain.jpg',
    description: 'Turnstiles - Spain'
  },
  {
    url: '../../assets/images/hardware-gallery/cayman-baku.jpg',
    description: 'Turnstile Cayman - trade show'
  },
  {
    url: '../../assets/images/hardware-gallery/protection-vw.jpg',
    description: 'Protection for engine'
  },
  {
    url: '../../assets/images/hardware-gallery/fireplace.jpg',
    description: 'Fireplace'
  },
  {
    url: '../../assets/images/hardware-gallery/skif-baku.jpg',
    description: 'Subway station - Baku'
  },
  // ---------------------------------------------------------------------------------------
  {
    url: '../../assets/images/hardware-gallery/turnstile-full-height.jpg',
    description: 'Full-height turnstile'
  },
  {
    url: '../../assets/images/hardware-gallery/fireplace-column.jpg',
    description: 'Bio fireplace'
  },
  {
    url: '../../assets/images/hardware-gallery/validator-senegal.jpg',
    description: 'Bus validator - Senegal'
  },
  {
    url: '../../assets/images/hardware-gallery/server.jpg',
    description: 'Server case'
  },
  {
    url: '../../assets/images/hardware-gallery/vending-machines.jpg',
    description: 'Ticket vending machines'
  },
  {
    url: '../../assets/images/hardware-gallery/vending-exposition.jpg',
    description: 'Vending machines - trade show'
  }
]